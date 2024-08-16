import { verify } from 'crypto'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,"Please provide Username"],
    unique: true
  },
  email:{
    type: String,
    required: [true,"Please provide Email"],
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  isAdmin:{
    type:Boolean
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyEmail: String,
  verifyEmailExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User;