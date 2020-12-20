import routes from '../routes'
import Video from '../models/Video'

// 비동기 처리 : async/await
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}) // DB 에서 video 들을 받아옴
    res.render('home', { pageTitle: 'Home', videos }) // home 화면에 video 목록 렌더링
  } catch (error) {
    console.log(error)
    res.render('home', { pageTitle: 'Home', videos: [] }) // error 를 대비하여 videos 에는 빈 배열을 할당
  }
}
export const search = (req, res) => {
  // console.log(req.query)
  const { query: { term: searchingBy } } = req // ES6
  // const searchingBy = req.query.term
  res.render('search', { pageTitle: 'search', searchingBy, videos }) // ES6
  // res.render('search', { pageTitle: 'search', searchingBy: searchingBy, videos: videos })
}
export const getUpload = (req, res) => res.render('upload', { pageTitle: 'upload' })

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  })
  console.log('req.body', req.body)
  console.log('req.file', req.file)
  console.log('newVideo', newVideo)
  res.redirect(`${routes.videos}${routes.videoDetail(newVideo.id)}`)
}

export const videoDetail = async (req, res) => {
  const { id } = req.params
  try {
    const video = await Video.findById(id)
    res.render('videoDetail', { pageTitle: `${video.title}`, video })
  } catch (error) {
    res.redirect(routes.home) // error(잘못된 id) 발생 시 home 으로 redirect 시킴
  }
}

// getEditVideo : video 수정 페이지를 렌더링하는 컨트롤러
export const getEditVideo = async (req, res) => {
  const { params: { id } } = req
  try {
    const video = await Video.findById(id)
    res.render('editVideo', { pageTitle: `Edit ${video.title}`, video })
  } catch (error) {
    res.redirect(routes.home)
  }
}

// postEditVideo : video 수정 페이지에서 사용자가 form 에 입력한 수정 데이터를 처리
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req
  try {
    await Video.findByIdAndUpdate(id, { title, description })
    res.redirect(`${routes.videos}${routes.videoDetail(id)}`)
  } catch (error) {
    res.render('editVideo', { pageTitle: 'editVideo' })
  }
}
export const deleteVideo = (req, res) => res.render('deleteVideo', { pageTitle: 'deleteVideo' })
