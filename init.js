import dotenv from 'dotenv'

import './db'
import app from './app'

// 스키마 등록(model 메서드 실행) 을 위해 import 시켜줘야함.
import './models/Video'
import './models/Comment'
import './models/User'

dotenv.config()

const { PORT } = process.env

const handleListening = () => console.log(`💙 Listening on PORT ${PORT}`)

// console.log('process.env: ', process.env)
// console.log('__dirname', __dirname)
// console.log('__filename', __filename)

app.listen(PORT, handleListening)
