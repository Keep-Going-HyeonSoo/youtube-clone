import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import path from 'path'
import { random } from 'mathjs'
import routes from './routes'

export const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.REGION
})

// multer 로 실제 파일을 DB에 저장시킨 후, 도큐먼트에는 파일자체가 아닌
// 파일 path 만을 저장시킬 것이다.

// ************** video multer ******************

/*
// 로컬서버에 저장하는 multer storage 설정
const videoLocalStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/videos/')
  },
  filename(req, file, cb) {
    const extension = path.extname(file.originalname)
    cb(null, new Date().valueOf() + extension)
    // 파일이름이 중복될 수 있는 이슈(극히 드물긴함)가 있지만 일단은 타임스탬프로 파일명을 지정 ( ex: 1607850021872.mp4 )
  }
})
*/

const videoS3Storage = multerS3({
  s3,
  acl: 'public-read',
  bucket: 'hyeon-tube/video',
  key(req, file, cb) {
    const extension = path.extname(file.originalname)
    const temp = random(1, 10)
    cb(null, temp.toString(36).slice(0, 1) + temp.toString(36).slice(2, 17) + extension)
  }
})

const multerVideo = multer({ storage: videoS3Storage })
// multerVideo : multer 인스턴스

// uploadVideo 미들웨어
export const uploadVideo = multerVideo.single('videoFile')
// uploadVideo 미들웨어는 multer 인스턴스를 통해
// form 에서 'videoFile' 이라는 필드의 파일을 1개만 받아서
// req.file 에 파일의 정보를 저장한다.

// ************** Avatar multer ******************

/*
// 로컬서버에 저장하는 multer storage 설정
const avatarLocalStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/avatar/')
  },
  filename(req, file, cb) {
    const extension = path.extname(file.originalname)
    cb(null, new Date().valueOf() + extension)
    // 파일이름이 중복될 수 있는 이슈(극히 드물긴함)가 있지만 일단은 타임스탬프로 파일명을 지정 ( ex: 1607850021872.mp4 )
  }
})
*/

const avatarS3Storage = multerS3({
  s3,
  acl: 'public-read',
  bucket: 'hyeon-tube/avatar',
  key(req, file, cb) {
    const extension = path.extname(file.originalname)
    const temp = random(1, 10)
    cb(null, temp.toString(36).slice(0, 1) + temp.toString(36).slice(2, 17) + extension)
  }
})

const multerAvatar = multer({ storage: avatarS3Storage })
export const uploadAvatar = multerAvatar.single('avatar')

// ************* localsMiddleware 미들웨어 ***************
export const localsMiddleware = (req, res, next) => {
  // view 템플릿에서는 res.locals 없이 siteName, routes .. 등으로 사용할수있음
  res.locals.siteName = 'HyeonTube'
  res.locals.routes = routes
  res.locals.loggedUser = req.user || null
  // console.log('req.user', req.user)
  next()
}

/* onlyPublic 미들웨어 : 비 로그인 사용자에게만 허용해주는 route protection 미들웨어 ( 로그인 유저는 home 으로 리다이렉트)
e.g ) join, login 등등 */
export const onlyPublic = (req, res, next) => {
  if (!req.user) {
    next()
  }
  else res.redirect(routes.home)
}

// onlyPrivate 미들웨어 : 로그인 사용자에게만 허용해주는 route protection 미들웨어
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next()
  }
  else res.redirect(routes.home)
}
