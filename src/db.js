import mongoose from 'mongoose'

// console.log('MONGO PROD: ', process.env.MONGO_URL_PROD)

mongoose.connect(
  // process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_LOCAL,
  process.env.MONGO_URL_PROD,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
)

const db = mongoose.connection

const handleOpen = () => console.log('🧡 Connected to DB')
const handleError = (error) => console.log(`❌ Error on DB Connection: ${error}`)

db.once('open', handleOpen) // open 이벤트가 발생할 때 한번만 실행
db.on('error', handleError)
