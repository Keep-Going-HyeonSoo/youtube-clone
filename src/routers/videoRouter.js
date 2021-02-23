import express from 'express'
import routes from '../routes'
import {
  getUpload, postUpload, videoDetail, getEditVideo, postEditVideo, deleteVideo
} from '../controllers/videoController'
import { uploadVideo, onlyPrivate } from '../middleware'

const videoRouter = express.Router() // '/videos'

videoRouter.get(routes.upload, onlyPrivate, getUpload)
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload) // 미들웨어 연속사용
// uploadVideo : multer 를 사용해서 실제 video 를 DB에 저장
// postUpload : video 의 path(req.file.path) 만 video 도큐먼트에 저장

videoRouter.get(routes.videoDetail(), videoDetail)
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo)
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo)

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo)

export default videoRouter
