import { Request, Response, NextFunction } from "express"
import { UserRoleEnum } from "./user.types"
import * as yup from "yup"

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;
type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export type Route = {
  method: HttpMethod;
  route: string;
  middlewares: Middleware[];
  controller: Controller;
};

export type Secret = {
  port: string;
  environment: string;
};

export type RequestObject = Request & {
  currentUser?: {
    role: UserRoleEnum;
    email: string;
    first_name: string;
    last_name: string;
  };
};

export type ValidationRules = {
  [key: string]: yup.Schema<unknown>;
};

export * from "./user.types"
