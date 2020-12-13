import routes from './routes'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/videos/')
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname)
    cb(null, new Date().valueOf() + extension)
    // 파일이름이 중복될 수 있는 이슈(극히 드물긴함)가 있지만 일단은 타임스탬프로 파일명을 지정 ( ex: 1607850021872.mp4 )
  }
})

const multerVideo = multer({ storage: storage })
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
