import { Router } from "express"
import { Route, UserRoleEnum } from "../utils/types/index"
import { isAuthenticated } from "../middlewares"
import { isAuthorized } from "../middlewares/isAuthorize"
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers"

const router = Router()

const taskRoutes: Route[] = [
  {
    method: "get",
    route: "/",
    middlewares: [
      isAuthenticated,
      isAuthorized([
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.EDITOR,
        UserRoleEnum.VIEWER,
      ]),
    ],
    controller: getTasks,
  },
  {
    method: "post",
    route: "/",
    middlewares: [
      isAuthenticated,
      isAuthorized([
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.EDITOR,
      ]),
    ],
    controller: createTask,
  },
  {
    method: "get",
    route: "/:id",
    middlewares: [
      isAuthenticated,
      isAuthorized([
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.EDITOR,
        UserRoleEnum.VIEWER,
      ]),
    ],
    controller: getTask,
  },
  {
    method: "put",
    route: "/:id",
    middlewares: [
      isAuthenticated,
      isAuthorized([
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.EDITOR,
      ]),
    ],
    controller: updateTask,
  },
  {
    method: "delete",
    route: "/:id",
    middlewares: [
      isAuthenticated,
      isAuthorized([
        UserRoleEnum.SUPER_ADMIN,
        UserRoleEnum.ADMIN,
        UserRoleEnum.EDITOR,
      ]),
    ],
    controller: deleteTask,
  },
]

taskRoutes.forEach((route) => {
  router[route.method](route.route, route.middlewares, route.controller)
})

export { router as taskRoutes }
