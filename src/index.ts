import express, {Request, urlencoded } from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import errorHandler from "./middlewares/errorHandler"
import morgan from "morgan"
import secrets from "../secrets"
import { appRouter as appRoutes } from "./routes"
import { initializeDatabase } from "./config/database"
import { __prod__ } from "./constants"
const app = express()

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: false }))

app.use(appRoutes)
app.use(errorHandler)

app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})

morgan.token("req-body", (req: Request) => JSON.stringify(req.body))
!__prod__ && app.use(morgan(":method :url :status :res[content-length] - :response-time ms - :req-body"))

!__prod__ && console.log(listEndpoints(app))


try {
	
  (async () => await initializeDatabase())()

  console.log("Database connection established.")
  app.listen(secrets.port, () => {
    console.log(`Server started at PORT ${secrets.port}`)
  })
} catch (error) {
  console.error("Unable to connect to the database:", error)
  process.exit(1)
}

