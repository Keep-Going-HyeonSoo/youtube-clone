import express from 'express'
import routes from '../routes'
import {
  userDetail, getEditProfile, postEditProfile, getChangePassword, postChangePassword
} from '../controllers/userController'
import { onlyPrivate, uploadAvatar } from '../middleware'

const userRouter = express.Router() // '/users'

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile)
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile)
userRouter.get(routes.changePassword, onlyPrivate, getChangePassword)
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword)
userRouter.get(routes.userDetail(), userDetail)
// 와일드카드 라우터(ex: /:id)는 최대한 아래에 작성

export default userRouter
