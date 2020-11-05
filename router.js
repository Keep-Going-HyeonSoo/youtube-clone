import express from 'express'

const userRouter = express.Router()

userRouter.get('/', (req, res) => res.send('user index'))

export default userRouter
