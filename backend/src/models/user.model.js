import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  fullName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlenght: 6
  },
  profilePic: {
    type: String,
    default: ""
  }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return

  const hashedPassword = await bcrypt.hash(this.password, 10)
  this.password = hashedPassword

  next()
})

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model("User", userSchema)

export default User