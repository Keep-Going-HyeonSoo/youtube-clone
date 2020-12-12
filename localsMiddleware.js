import routes from './routes'
import multer from 'multer'

const multerVideo = multer({ dest: 'videos/' })
// multerVideo : multer 인스턴스

export const uploadVideo = multerVideo.single('videoFile')
// uploadVideo 미들웨어는 multer 인스턴스를 통해
// form 에서 'videoFile' 이라는 필드의 파일을 1개만 받아서
// req.file 에 파일의 정보를 저장한다.

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'HyeonTube'
  res.locals.routes = routes
  res.locals.user = {
    isAuthenticated: true,
    id: 24
  }
  next()
}
