import { Response, NextFunction } from "express"

import { HttpException } from "../utils/exceptions/http"
import { RequestObject, User, UserRoleEnum } from "../utils/types"
import { createUser, getUserByEmail } from "../../models"
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/helperFunctions"

export const loginHandler = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    const user = await getUserByEmail(email)
    if (!user) {
      return next(new HttpException(401, "Invalid credentials", "error"))
    }
    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      return next(new HttpException(401, "Invalid credentials", "error"))
    }

    const token = generateToken(user.id!, user.role)

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    next(new HttpException(500, "Error logging in", error))
  }
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

    return res
      .status(201)
      .json({ id: userId, name, email, role: UserRoleEnum.VIEWER })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(new HttpException(400, error?.message, error.response?.data || error))
  }
}
