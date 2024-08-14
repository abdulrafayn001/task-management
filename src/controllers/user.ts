import { Request, Response, NextFunction } from "express"
import * as yup from "yup"
import { validateRequest } from "../utils/validators"
import { HttpException } from "../utils/exceptions/http"
import {
  changeRoleHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
} from "../services/user"
import { UserRoleEnum } from "../utils/types"

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getUsersHandler(req, res, next)
}

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isValid, error } = await validateRequest(req.params, {
    id: yup.number().required(),
  })

  if (isValid) {
    getUserHandler(req, res, next)
  } else {
    next(new HttpException(error.status, error.message, error.data))
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isValid, error } = await validateRequest(
    { ...req.body, id: req.params.id },
    {
      id: yup.number().required(),
      name: yup.string().required(),
    }
  )

  if (isValid) {
    updateUserHandler(req, res, next)
  } else {
    next(new HttpException(error.status, error.message, error.data))
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isValid, error } = await validateRequest(req.params, {
    id: yup.number().required(),
  })

  if (isValid) {
    deleteUserHandler(req, res, next)
  } else {
    next(new HttpException(error.status, error.message, error.data))
  }
}

export const changeRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isValid, error } = await validateRequest({...req.body, id: req.params.id}, {
    id: yup.number().required(),
    role: yup
      .string()
      .oneOf([UserRoleEnum.ADMIN, UserRoleEnum.VIEWER, UserRoleEnum.EDITOR])
      .required(),
  })

  if (isValid) {
    changeRoleHandler(req, res, next)
  } else {
    next(new HttpException(error.status, error.message, error.data))
  }
}
