import routes from '../routes'
import Video from '../models/Video'

// 비동기 처리 : async/await
export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
    res.render('home', { pageTitle: 'Home', videos })
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

export const postUpload = (req, res) => {
  const { file, title, description } = req.body
  // to do : generate random newVideoId
  const newVideoId = 999
  res.redirect(`${routes.videos}${routes.videoDetail(newVideoId)}`)
}

export const videoDetail = (req, res) => {
  const { id } = req.params
  res.render('videoDetail', { pageTitle: 'videoDetail', id })
}
export const editVideo = (req, res) => res.render('editVideo', { pageTitle: 'editVideo' })
export const deleteVideo = (req, res) => res.render('deleteVideo', { pageTitle: 'deleteVideo' })
