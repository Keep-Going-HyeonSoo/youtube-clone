import express from 'express'
import routes from '../routes'
import { getUpload, postUpload, videoDetail, editVideo, deleteVideo } from '../controllers/videoController'
import { uploadVideo } from '../localsMiddleware'

const videoRouter = express.Router() // '/videos'

videoRouter.get(routes.upload, getUpload)
videoRouter.post(routes.upload, uploadVideo, postUpload) // 미들웨어 연속사용
videoRouter.get(routes.videoDetail(), videoDetail)
videoRouter.get(routes.editVideo, editVideo)
videoRouter.get(routes.deleteVideo, deleteVideo)

export default videoRouter
