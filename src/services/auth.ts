import { Response, NextFunction } from "express"

import { HttpException } from "../utils/exceptions/http"
import { RequestObject, User, UserRoleEnum } from "../utils/types"
import { createUser, getUserByEmail } from "../../models"
import { hashPassword } from "../utils/helperFunctions"

export const loginHandler = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  next(new HttpException(400,"data","error"))
}


export const signUpHandler = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return next(new HttpException(400, "Email already in use", "error"))
    }

    const hashedPassword = await hashPassword(password)
    const newUser: User = {
      name,
      email,
      password: hashedPassword,
      role: UserRoleEnum.VIEWER,
    }
    const userId = await createUser(newUser)

    return res.status(201).json({ id: userId, name, email, role: UserRoleEnum.VIEWER })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(new HttpException(400, error?.message, error.response?.data || error))
  }
}
