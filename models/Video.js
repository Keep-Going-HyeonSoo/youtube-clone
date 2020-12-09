import mongoose from 'mongoose'

// Video 스키마 생성
const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: 'File URL is required'
  },
  title: {
    type: String,
    required: 'Title is required'
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// mongoose.model() 메서드 : 스키마를 등록하는 메서드
const model = mongoose.model('Video', VideoSchema) // 자동으로 소문자화와 복수형 붙혀서 컬렉션이름 생성 ('Video' -> 'vidoes' 컬렉션 생성 )

export default model
