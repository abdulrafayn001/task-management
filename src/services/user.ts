import { Response, NextFunction } from "express"

import { HttpException } from "../utils/exceptions/http"
import { RequestObject } from "../utils/types"
import { deleteUser, getUser, getUsers, updateUser } from "../../models"

export const getUsersHandler = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsers()
    return res.status(200).json({ data: users })
  } catch (error) {
    next(new HttpException(500, "Something went wrong", error))
  }
}

export const getUserHandler = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const user = await getUser(+id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.status(200).json({ data: user })
  } catch (error) {
    next(new HttpException(500, "Something went wrong", error))
  }
}

export const updateUserHandler = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { name } = req.body
    const updatedUser = await updateUser(+id, { name })
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.json({ data: updatedUser })
  } catch (error) {
    next(new HttpException(500, "Something went wrong", error))
  }
}

export const deleteUserHandler = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const deletedUser = await deleteUser(+id)
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.json({ data: deletedUser })
  } catch (error) {
    next(new HttpException(500, "Something went wrong", error))
  }
}

export const changeRoleHandler = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { role } = req.body
    const updatedUser = await updateUser(+id, { role })
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.json({ data: updatedUser })
  } catch (error) {
    next(new HttpException(500, "Something went wrong", error))
  }
}
