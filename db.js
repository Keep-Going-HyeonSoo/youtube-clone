import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })

const db = mongoose.connection

const handleOpen = () => console.log('🧡 Connected to DB')
const handleError = (error) => console.log(`❌ Error on DB Connection: ${error}`)

db.once('open', handleOpen) // open 이벤트가 발생할 때 한번만 실행
db.on('error', handleError)
