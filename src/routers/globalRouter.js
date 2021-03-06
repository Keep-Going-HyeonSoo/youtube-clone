import express from 'express'
import routes from '../routes'
import {
  getJoin, postJoin, getLogin, postLogin, logout, getMe
} from '../controllers/userController'
import { home, search } from '../controllers/videoController'
import { onlyPublic, onlyPrivate } from '../middleware'
import {
  githubLogin, githubLoginMiddleware, githubLoginSuccess,
  facebookLogin, facebookLoginMiddleware, facebookLoginSuccess
} from '../controllers/socialLoginController'

const globalRouter = express.Router() // '/'

globalRouter.get(routes.home, home)
globalRouter.get(routes.join, onlyPublic, getJoin)
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin)
globalRouter.get(routes.login, onlyPublic, getLogin)
globalRouter.post(routes.login, onlyPublic, postLogin)
globalRouter.get(routes.logout, onlyPrivate, logout)
globalRouter.get(routes.search, search)

globalRouter.get(routes.me, getMe) // userDetail

// github login

globalRouter.get(routes.githubLogin, githubLogin)
globalRouter.get(routes.githubLoginCB, githubLoginMiddleware, githubLoginSuccess)

// facebook login

globalRouter.get(routes.facebookLogin, facebookLogin)
globalRouter.get(routes.facebookLoginCB, facebookLoginMiddleware, facebookLoginSuccess)

export default globalRouter
