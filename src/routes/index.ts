import { Router } from "express"

import { authRoutes } from "./auth"
import { userRoutes } from "./user"
import { taskRoutes } from "./task"

const appRouter = Router()

appRouter.use("/auth", authRoutes)
appRouter.use("/users", userRoutes)
appRouter.use("/tasks", taskRoutes)

export { appRouter }
