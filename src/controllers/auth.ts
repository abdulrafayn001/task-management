import { Request, Response, NextFunction } from "express"
import * as yup from "yup"
import { loginHandler } from "../services/auth"
import { validateRequest } from "../utils/validators"
import { HttpException } from "../utils/exceptions/http"

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isValid, error } = await validateRequest(req.body, {
    email: yup.string().email().required(),
    password: yup.string().required(),
  })

  if (isValid) {
    loginHandler(req, res, next)
  } else {
    next(new HttpException(error.status, error.message, error.data))
  }
}
