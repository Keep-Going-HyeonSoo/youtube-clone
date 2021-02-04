import express from 'express'
import routes from '../routes'
import {
  changePassword, userDetail, getEditProfile, postEditProfile
} from '../controllers/userController'
import { onlyPrivate, uploadAvatar } from '../middleware'

const userRouter = express.Router() // '/users'

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile)
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile)
userRouter.get(routes.changePassword, onlyPrivate, changePassword)
userRouter.get(routes.userDetail(), onlyPrivate, userDetail)
// 와일드카드 라우터(ex: /:id)는 최대한 아래에 작성

export default userRouter
