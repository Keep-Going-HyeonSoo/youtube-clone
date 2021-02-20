import express from 'express'
import {
  getProfile, postAddComment, postDeleteComment, postIncViewCount
} from '../controllers/videoController'
import { onlyPrivate } from '../middleware'
import routes from '../routes'

const apiRouter = express.Router() // '/api'

apiRouter.post(routes.incViewCount, postIncViewCount)
apiRouter.post(routes.addComment, onlyPrivate, postAddComment)
apiRouter.get(routes.getProfile, getProfile)
apiRouter.post(routes.deleteComment, postDeleteComment)

export default apiRouter
