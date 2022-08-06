import mongoose from 'mongoose'
const Schema = mongoose.Schema
const customerSchema = new Schema({
  full_name: {
    type: String,
    required: true,
  },
  rfid: {
    type: String,
    required: true,
  },
  room_number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  histories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'history',
    },
  ],
})
export default mongoose.model('customer', customerSchema, 'customer')
