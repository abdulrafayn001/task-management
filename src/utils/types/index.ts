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
  jwtSecret: string;
};

export type RequestObject = Request & {
  currentUser?: {
    role: UserRoleEnum;
    email: string;
    name: string;
    id: number;
  };
};

export type ValidationRules = {
  [key: string]: yup.Schema<unknown>;
};

export type DecodedToken = {
  userId: number;
  email: string;
  role: UserRoleEnum;
};

export * from "./user.types"
