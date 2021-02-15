import express from 'express'
import { postAddComment, postIncViewCount } from '../controllers/videoController'
import routes from '../routes'

const apiRouter = express.Router() // '/api'

apiRouter.post(routes.incViewCount, postIncViewCount)
apiRouter.post(routes.addComment, postAddComment)

export default apiRouter
