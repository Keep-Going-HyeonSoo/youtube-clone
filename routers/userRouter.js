import express from 'express'
import routes from '../routes'
import { users, editProfile, changePassword, userDetail } from '../controllers/userController'

const userRouter = express.Router() // '/users'

userRouter.get(routes.users, users)
userRouter.get(routes.editProfile, editProfile)
userRouter.get(routes.changePassword, changePassword)
userRouter.get(routes.userDetail, userDetail)

export default userRouter
