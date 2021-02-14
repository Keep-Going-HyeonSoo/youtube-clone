import express from 'express'
import { postIncViewCount } from '../controllers/videoController'
import routes from '../routes'

const apiRouter = express.Router() // '/api'

apiRouter.post(routes.incViewCount, postIncViewCount)

export default apiRouter
