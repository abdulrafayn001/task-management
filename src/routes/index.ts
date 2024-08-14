import { Router } from "express"

import { authRoutes } from "./auth"
import { userRoutes } from "./user"

const appRouter = Router()

appRouter.use("/auth", authRoutes)
appRouter.use("/users", userRoutes)


export { appRouter }
