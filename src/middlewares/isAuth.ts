import { Response, NextFunction } from "express"

import { HttpException } from "../utils/exceptions/http"
import { DecodedToken, RequestObject } from "../utils/types"

import jwt from "jsonwebtoken"
import secrets from "../../secrets"
import { getUserByEmail } from "../../models"

export const isAuthenticated = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return next(new HttpException(401, "Token Missing!", []))
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, secrets.jwtSecret!) as DecodedToken

    const user = await getUserByEmail(decoded.email)

    if (!user) {
      return next(
        new HttpException(
          401,
          "Not Authenticated Please Contact Admin For Permission",
          []
        )
      )
    }

    req.currentUser = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      name: user.name
    }
    next()
  } catch (error) {
    next(new HttpException(401, "Invalid Token!", error))
  }
}
