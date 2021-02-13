import express from 'express'
import { postIncViewCount } from '../controllers/videoController'
import routes from '../routes'

const apiRouter = express.Router() // '/videos'

apiRouter.get(routes.incViewCount, postIncViewCount)

export default apiRouter
