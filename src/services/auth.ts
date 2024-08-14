import { Response, NextFunction } from "express"

import { HttpException } from "../utils/exceptions/http"
import { RequestObject } from "../utils/types"

export const loginHandler = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  next(new HttpException(400,"data","error"))
}
