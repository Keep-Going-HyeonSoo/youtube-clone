import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import helmet from 'helmet'

import routes from './routes'
import { localsMiddleware } from './localsMiddleware'
import globalRouter from './routers/globalRouter'
import videoRouter from './routers/videoRouter'
import userRouter from './routers/userRouter'

const app = express()

app.use(helmet())
app.use(function (req, res, next) {
  res.setHeader('Content-Security-Policy', "script-src 'self' https://archive.org")
  return next()
})
app.set('view engine', 'pug')
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(localsMiddleware)

app.use(routes.home, globalRouter) // '/'
app.use(routes.users, userRouter) // '/users'
app.use(routes.videos, videoRouter) // '/videos'

export default app
