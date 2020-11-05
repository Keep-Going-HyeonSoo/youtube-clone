import express from 'express'

const globalRouter = express.Router()

globalRouter.get('/', (req, res) => res.send('global index'))

export default globalRouter
