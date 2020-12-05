import express from 'express'
import routes from '../routes'
import { editProfile, changePassword, userDetail } from '../controllers/userController'

const userRouter = express.Router() // '/users'

userRouter.get(routes.editProfile, editProfile)
userRouter.get(routes.changePassword, changePassword)
userRouter.get(routes.userDetail(), userDetail) // 와일드카드 라우터(ex: /:id)는 최대한 아래에 작성

export default userRouter
