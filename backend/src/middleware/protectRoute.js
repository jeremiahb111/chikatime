import { StatusCodes } from "http-status-codes"
import { AppError } from "../utils/appError.js"
import User from "../models/user.model.js"
import { verifyToken } from "../lib/jwt.js"

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies['token']

    if (!token) throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized')

    const decoded = await verifyToken(token)

    const user = await User.findOne({ _id: decoded.id }).select('-password')

    if (!user) throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized')

    req.user = user

    next()
  } catch (error) {
    next(error)
  }
}