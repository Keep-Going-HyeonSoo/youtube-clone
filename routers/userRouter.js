import express from 'express'
import routes from '../routes'

const userRouter = express.Router() // '/users'

userRouter.get(routes.users, (req, res) => res.send('user index'))
userRouter.get(routes.editProfile, (req, res) => res.send('EDIT_PROFILE'))
userRouter.get(routes.changePassword, (req, res) => res.send('CHANGE_PASSWORD'))
userRouter.get(routes.userDetail, (req, res) => res.send('USER_DETAIL'))

export default userRouter
