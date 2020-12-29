import './db'
import dotenv from 'dotenv'
import app from './app'

// 스키마 등록(model 메서드 실행) 을 위해 import 시켜줘야함.
import './models/Video'
import './models/Comment'

dotenv.config()

const { PORT } = process.env

const handleListening = () => console.log(`💙 Listening on PORT ${PORT}`)

app.listen(PORT, handleListening)
