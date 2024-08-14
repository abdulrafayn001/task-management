import { Router } from "express"
import { Route, UserRoleEnum } from "../utils/types/index"
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changeRole,
} from "../controllers/user"
import { isAuthenticated } from "../middlewares"
import { isAuthorized } from "../middlewares/isAuthorize"

const router = Router()

const userRoute: Route[] = [
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
    controller: getUsers,
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
    controller: getUser,
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
    controller: updateUser,
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
    controller: deleteUser,
  },
  {
    method: "patch",
    route: "/:id/role",
    middlewares: [isAuthenticated, isAuthorized([UserRoleEnum.SUPER_ADMIN])],
    controller: changeRole,
  },
]

userRoute.forEach((route) => {
  router[route.method](route.route, route.middlewares, route.controller)
})

export { router as userRoutes }
