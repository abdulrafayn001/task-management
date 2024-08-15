import { Request, Response, NextFunction } from "express"
import * as yup from "yup"
import { validateRequest } from "../utils/validators"
import { HttpException } from "../utils/exceptions/http"
import { RequestObject, TaskStatus } from "../utils/types"
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from "../services"

export const createTask = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  const { isValid, error } = await validateRequest(
    { ...req.body, userId: req.currentUser?.id },
    {
      userId: yup.number().required(),
      title: yup.string().required(),
      description: yup.string().optional(),
      status: yup
        .string()
        .oneOf([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
        .required(),
    }
  )

  if (isValid) {
    createTaskHandler(req, res, next)
  } else {
    next(new HttpException(error.status, error.message, error.data))
  }
}

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getTasksHandler(req, res, next)
}

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isValid, error } = await validateRequest(req.params, {
    id: yup.number().required(),
  })

  if (isValid) {
    getTaskHandler(req, res, next)
  } else {
    next(new HttpException(error.status, error.message, error.data))
  }
}

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isValid, error } = await validateRequest(
    { ...req.body, id: req.params.id },
    {
      id: yup.number().required(),
      title: yup.string().optional(),
      description: yup.string().optional(),
      status: yup
        .string()
        .oneOf([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
        .optional(),
    }
  )

  if (isValid) {
    updateTaskHandler(req, res, next)
  } else {
    next(new HttpException(error.status, error.message, error.data))
  }
}

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isValid, error } = await validateRequest(req.params, {
    id: yup.number().required(),
  })

  if (isValid) {
    deleteTaskHandler(req, res, next)
  } else {
    next(new HttpException(error.status, error.message, error.data))
  }
}
