import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import mongoose from 'mongoose'
import session from 'express-session'
import flash from 'express-flash'
import path from 'path'
import connectMongo from 'connect-mongo'
import passport from 'passport'
import './passport' // passport config 파일 ( LocalStrategy, serialize, deserialize )

import routes from './routes'

import { localsMiddleware } from './middleware'
import globalRouter from './routers/globalRouter'
import videoRouter from './routers/videoRouter'
import userRouter from './routers/userRouter'
import apiRouter from './routers/apiRouter'

const app = express()

const MongoStore = connectMongo(session)

app.use(helmet())
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self' https://archive.org")
  return next()
})
app.use('/static', express.static(path.join(__dirname, 'static')))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
)

app.use(flash())

// passport 미들웨어는 express sesson 미들웨어 아래에 위치
app.use(passport.initialize())
app.use(passport.session())
// app.use((req, res, next) => {
//   console.log('req.session', req.session)
//   next()
// })

app.use(localsMiddleware)

app.use(routes.home, globalRouter) // '/'
app.use(routes.users, userRouter) // '/users'
app.use(routes.videos, videoRouter) // '/videos'
app.use(routes.api, apiRouter)

export default app
