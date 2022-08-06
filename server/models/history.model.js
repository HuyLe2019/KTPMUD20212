import mongoose from 'mongoose'
const Schema = mongoose.Schema
const historySchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'customer',
  },
  index: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: () => new Date(),
  },
})
export default mongoose.model('history', historySchema, 'history')
