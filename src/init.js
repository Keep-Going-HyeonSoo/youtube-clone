import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './dotenv' // .env 환경변수 불러오는 파일 : 제일 위에 위치해야함
import './db'
import app from './app'

// 스키마 등록(model 메서드 실행) 을 위해 import 시켜줘야함.
import './models/Video'
import './models/Comment'
import './models/User'

// dotenv.config() -> 이미 ./db.js 에서 dotenv 실행됨

const { PORT } = process.env

const handleListening = () => console.log(`💙 Listening on PORT ${PORT}`)

// console.log('process.env: ', process.env)
// console.log('__dirname', __dirname)
// console.log('__filename', __filename)

// console.log('process.cwd(): ', process.cwd())

app.listen(PORT, handleListening)
