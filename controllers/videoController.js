import fs from 'fs' // file system 모듈
import { Error } from 'mongoose'
import routes from '../routes'
import Video from '../models/Video'
import Comment from '../models/Comment'

// 비동기 처리 : async/await
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: '-1' }) // DB 에서 video 들을 받아오고, 내림차순('-1' 또는 'desc')으로 정렬 (최신videor가 위로 오게끔)

    res.render('home', { pageTitle: 'Home', videos }) // home 화면에 video 목록 렌더링
  }
  catch (error) {
    console.log(error)
    res.render('home', { pageTitle: 'Home', videos: [] }) // error 를 대비하여 videos 에는 빈 배열을 할당
  }
}
export const search = async (req, res) => {
  // console.log(req.query)
  const { query: { term: searchingBy } } = req // ES6
  // const searchingBy = req.query.term
  let videos = []
  try {
    videos = await Video.find({
      title: { $regex: `${searchingBy}`, $options: 'i' }
    })
  }
  catch (error) {
    console.log(error)
  }

  res.render('search', { pageTitle: `search ${searchingBy}`, searchingBy, videos }) // ES6
  // res.render('search', { pageTitle: 'search', searchingBy: searchingBy, videos: videos })
}

export const getUpload = (req, res) => res.render('upload', { pageTitle: 'upload' })

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path } // req.file : multer 미들웨어에 의해 생성됨
  } = req
  // create = new Model + save()
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  })
  req.user.videos.push(newVideo.id)
  await req.user.save()

  res.redirect(`${routes.videos}${routes.videoDetail(newVideo.id)}`)

  // to do
  // video upload 시, 업로드 진행율 퍼센트로 표시시켜주기
}

export const videoDetail = async (req, res) => {
  const { id } = req.params
  try {
    const video = await Video.findById(id).populate('creator').populate({
      path: 'comments',
      populate: { path: 'creator' }
    })
    console.log(video)
    res.render('videoDetail', { pageTitle: video.title, video })
  }
  catch (error) {
    res.redirect(routes.home) // error(잘못된 id) 발생 시 home 으로 redirect 시킴
  }
}

// getEditVideo : video 수정 페이지를 렌더링하는 컨트롤러
export const getEditVideo = async (req, res) => {
  const { params: { id } } = req
  try {
    const video = await Video.findById(id)

    // routing protection ( video 를 upload 한 사람만 edit 가능 )
    if (req.user.id !== video.creator.toString()) {
      // typeof req.user.id : String
      // typeof video.creator : Object
      // 서로 다른 타입이므로 != 를 써서 형 변환을 시키거나, toString() 을 써줘야함
      throw Error() // catch 로 분기됨
    }
    else {
      res.render('editVideo', { pageTitle: `Edit ${video.title}`, video })
    }
  }
  catch (error) {
    res.redirect(routes.home)
  }
}

// postEditVideo : video 수정 페이지에서 사용자가 form 에 입력한 수정 데이터를 처리
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req
  console.log(1)
  try {
    const video = await Video.findById(id)

    // routing protection ( video 를 upload 한 사람만 edit 가능 )
    if (req.user.id !== video.creator.toString()) {
      throw Error() // catch 로 분기됨
    }
    else {
      video.title = title
      video.description = description
      await video.save()
      res.redirect(`${routes.videos}${routes.videoDetail(id)}`)
    }
  }
  catch (error) {
    res.redirect(routes.home)
  }
}

export const deleteVideo = async (req, res) => {
  const { params: { id } } = req
  console.log(id)
  try {
    const video = await Video.findById(id)

    // routing protection ( video 를 upload 한 사람만 edit 가능 )
    if (req.user.id !== video.creator.toString()) {
      throw Error() // catch 로 분기됨
    }
    else {
      // 서버에서 video 삭제
      fs.unlink(`/workspace/youtube-clone/${video.fileUrl}`, (err) => {
        console.log(err)
      })
      // DB의 video document 삭제
      await Video.findByIdAndDelete(id)

      // DB의 user document 에서 videos 배열에서 삭제
      const idx = req.user.videos.indexOf(id)
      if (idx > -1) {
        req.user.videos.splice(idx, 1)
        await req.user.save()
      }
    }
  }
  catch (error) {
    console.log(error)
  }
  finally {
    res.redirect(routes.home)
  }
}

// API

// 조회수 증가
export const postIncViewCount = async (req, res) => {
  const { params: { id } } = req
  try {
    const video = await Video.findById(id)
    video.views += 1
    await video.save()
    res.status(200)
  }
  catch (err) {
    console.log(err)
    res.status(400)
  }
  finally {
    res.end()
  }
}

// video에 댓글생성
export const postAddComment = async (req, res) => {
  const { params: { id }, body: { comment }, user } = req // 여기서의 id는 video 의 id임

  try {
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    })

    // 해당 video document 에 저장
    const video = await Video.findById(id)
    video.comments.push(newComment.id)
    await video.save()

    // 해당 user document 에 저장
    user.comments.push(newComment.id)
    await user.save()

    console.log(newComment, video, user)
  }
  catch (err) {
    console.log(err)
    res.status(400)
  }
  finally {
    res.end()
  }
}

export const getProfile = async (req, res) => {
  if (req.user) {
    res.status(200)
    res.json(req.user)
  }
  else {
    res.status(400)
    res.end()
  }
}
