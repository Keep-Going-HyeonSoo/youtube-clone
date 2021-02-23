import mongoose from 'mongoose'
import moment from 'moment-timezone'

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: 'Text is required'
  },
  createdAt: {
    type: Date,
    default: moment(Date.now()).add(9, 'hours')
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const model = mongoose.model('Comment', CommentSchema)

export default model
