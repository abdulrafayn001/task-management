import { Response, NextFunction } from "express"

import { HttpException } from "../utils/exceptions/http"
import { RequestObject } from "../utils/types"

export const isAuthenticated = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-access-token"] as string
  if (!token) {
    next(new HttpException(401, "Token Missing!", []))
  }
  next()
}
