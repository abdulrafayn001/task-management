import { Request, Response, NextFunction } from "express"
import { HttpException } from "../utils/exceptions/http"

const errorHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException) {
    return res
      .status(err.statusCode)
      .json({ status: err.statusCode, message: err.message, data: err.data })
  } else {
    next(err)
  }
}

export default errorHandler
