import jwt from 'jsonwebtoken'
import { AppError } from '../utils/appError.js'

export const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })

  res.cookie('token', token, {
    httpOnly: true, // prevent XXS attacks cross-site scripting
    sameSite: 'strict', // CSRF attacks 
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production'
  })
}

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return reject(new AppError(StatusCodes.UNAUTHORIZED, 'Invalid token'))
      return resolve(decoded)
    })
  })
}