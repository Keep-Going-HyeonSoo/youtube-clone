import './db'
import app from './app'
import dotenv from 'dotenv'
import './models/Video' // 스키마 등록(model 메서드 실행) 을 위해 import 시켜줘야함.

dotenv.config()

const PORT = process.env.PORT

const handleListening = () => console.log(`💙 Listening on PORT ${PORT}`)

app.listen(PORT, handleListening)
