import { Response, NextFunction } from "express"

import { HttpException } from "../utils/exceptions/http"
import { RequestObject } from "../utils/types"
import {
  createTask,
  deleteTask,
  findTaskById,
  getAllTasks,
  updateTask,
} from "../../models"

export const createTaskHandler = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, status } = req.body

    if (!req.currentUser?.id)
      return next(new HttpException(401, "Unauthorized", []))

    const createdTask = await createTask({
      title,
      description,
      status,
      userId: +req.currentUser?.id,
    })

    return res.json({
      data: createdTask,
      message: "Task created successfully",
    })
  } catch (error) {
    next(new HttpException(500, "Something went wrong", error))
  }
}

export const getTasksHandler = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.currentUser?.id)
      return next(new HttpException(404, "User not found", []))

    const tasks = await getAllTasks(req.currentUser?.id)
    return res.status(200).json({ data: tasks })
  } catch (error) {
    next(new HttpException(500, "Something went wrong", error))
  }
}

export const getTaskHandler = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const task = await findTaskById(+id)

    if (!req.currentUser?.id || req.currentUser?.id !== task?.userId) {
      return next(new HttpException(401, "Unauthorized", []))
    }

    if (!task) return next(new HttpException(404, "Task not found", []))

    return res.status(200).json({ data: task })
  } catch (error) {
    next(new HttpException(500, "Something went wrong", error))
  }
}

export const updateTaskHandler = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { title, description, status } = req.body

    const task = await findTaskById(+id)

    if (!req.currentUser?.id || req.currentUser?.id !== task?.userId) {
      return next(new HttpException(401, "Unauthorized", []))
    }

    const updatedTask = await updateTask(+id, { title, description, status })

    if (!updatedTask) {
      return res.status(204).json({ message: "Task not found" })
    }
    return res.json({ data: updatedTask })
  } catch (error) {
    next(new HttpException(500, "Something went wrong", error))
  }
}

export const deleteTaskHandler = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const task = await findTaskById(+id)

    if (!task) {
      return next(new HttpException(404, "Task not found", []))
    }

    if (!req.currentUser?.id || req.currentUser?.id !== task?.userId) {
      return next(new HttpException(401, "Unauthorized", []))
    }

    await deleteTask(+id)

    return res.json({ data: task, message: "Task deleted successfully" })
  } catch (error) {
    next(new HttpException(500, "Something went wrong", error))
  }
}
