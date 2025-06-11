import { StatusCodes } from "http-status-codes"
import { AppError } from "../utils/appError.js"
import { ZodError } from "zod"

export const errorHandler = (error, req, res, next) => {
  const message = (error instanceof ZodError) ? 'Zod Validation Error' : error.message
  console.error(`${req.originalUrl} - ${message}`)

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message
    })
  } else if (error instanceof ZodError) {
    const zodError = error.issues.map(err => {
      return {
        path: err.path[0],
        message: err.message
      }
    })

    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Validation Error',
      errors: zodError
    })
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message
    })
  }
}