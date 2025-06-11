import { StatusCodes } from "http-status-codes"
import User from "../models/user.model.js"
import { AppError } from "../utils/appError.js"
import { generateToken } from "../lib/jwt.js"
import { uploadImage, deleteImage } from "../lib/cloudinary.js"

export const signup = async (req, res, next) => {
  const { email } = req.body

  const isUserExist = await User.findOne({ email })

  if (isUserExist) throw new AppError(StatusCodes.BAD_REQUEST, 'Email already taken')

  const user = await User.create({ ...req.body })

  const { password, ...userObj } = user.toObject()

  generateToken(user._id, res)

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'User created successfully',
    data: userObj
  })
}

export const login = async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user || !(await user.comparePassword(password))) throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid credentials')

  const { password: _, ...userObj } = user.toObject()

  generateToken(user._id, res)

  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'User logged in successfully',
    data: userObj
  })
}

export const logout = async (req, res, next) => {
  res.clearCookie('token').status(StatusCodes.OK).json({
    success: true,
    message: 'Successfully logged out'
  })
}

export const updateProfile = async (req, res, next) => {
  const user = req.user
  const { profilePic } = req.body

  if (user.profilePic) {
    const currentProfilePic = user.profilePic.split("/").pop().split(".")[0]
    await deleteImage(currentProfilePic, "profile-pic")
  }

  const img = await uploadImage(profilePic, "profile-pic")

  user.profilePic = img

  await user.save()

  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'Profile updated successfully',
    data: user
  })
}

export const checkAuth = async (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'User is authenticated',
    data: req.user
  })
}