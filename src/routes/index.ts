import { Router } from "express"

import { authRoutes } from "./auth"

const appRouter = Router()

appRouter.use("/auth", authRoutes)

export { appRouter }
