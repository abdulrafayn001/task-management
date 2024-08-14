import { Router } from "express"
import { Route } from "../utils/types/index"
import { login, register } from "../controllers/auth"

const router = Router()

const authRoute: Route[] = [
  {
    method: "post",
    route: "/login",
    middlewares: [],
    controller: login,
  },
  {
    method: "post",
    route: "/register",
    middlewares: [],
    controller: register,
  },
]

authRoute.forEach((route) => {
  router[route.method](route.route, route.middlewares, route.controller)
})

export { router as authRoutes }
