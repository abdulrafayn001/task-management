import { Router } from "express"
import { Route } from "../utils/types/index"
import { login } from "../controllers/auth"

const router = Router()

const authRoute: Route[] = [
  {
    method: "post",
    route: "/login",
    middlewares: [],
    controller: login,
  },
]

authRoute.forEach((route) => {
  router[route.method](route.route, route.middlewares, route.controller)
})

export { router as authRoutes }
