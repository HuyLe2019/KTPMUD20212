import mongoose from 'mongoose'
import ERole from '../enums/role.enum.js'
const Schema = mongoose.Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: () => ERole.normal,
  },
})
export default mongoose.model('user', userSchema, 'user')
