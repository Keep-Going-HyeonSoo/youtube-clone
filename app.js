import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import helmet from 'helmet'

import session from 'express-session'
import passport from 'passport'
import './passport' // passport config 파일 ( LocalStrategy, serialize, deserialize )
import routes from './routes'

import { localsMiddleware } from './localsMiddleware'
import globalRouter from './routers/globalRouter'
import videoRouter from './routers/videoRouter'
import userRouter from './routers/userRouter'

const app = express()

app.use(helmet())
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self' https://archive.org")
  return next()
})
app.use('/uploads', express.static('uploads')) // 첫 번째 인자는 파일 경로가 아닌 프론트 경로에서의 접두부
app.use('/static', express.static('static'))
app.set('view engine', 'pug')
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  console.log('req.session', req.session)
  next()
})

app.use(localsMiddleware)

app.use(routes.home, globalRouter) // '/'
app.use(routes.users, userRouter) // '/users'
app.use(routes.videos, videoRouter) // '/videos'

export default app
