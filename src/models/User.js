import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: { type: String, default: 'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png' }, // 로컬로 가입시 기본 avatar 지정
  facebookId: Number,
  githubId: Number,
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

const model = mongoose.model('User', UserSchema)

export default model
