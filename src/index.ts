import express, { Request, urlencoded } from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import errorHandler from "./middlewares/errorHandler"
import morgan from "morgan"
import secrets from "../secrets"
import { appRouter as appRoutes } from "./routes"
import { getDatabase, initializeDatabase } from "./config/database"
import { __prod__ } from "./constants"

const app = express()

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: false }))

async function startServer() {
  try {
    await initializeDatabase()

    app.use(appRoutes)
    app.use(errorHandler)

    app.get("/health", async (req, res) => {
      try {
        getDatabase().get("SELECT 1")
        res.status(200).json({ status: "OK" })
      } catch (_error) {
        res
          .status(500)
          .json({ status: "Error", message: "Database not connected" })
      }
    })

    morgan.token("req-body", (req: Request) => JSON.stringify(req.body))

    !__prod__ &&
      app.use(
        morgan(
          ":method :url :status :res[content-length] - :response-time ms - :req-body"
        )
      )

    !__prod__ && console.log(listEndpoints(app))

    app.listen(secrets.port, () => {
      console.log(`Server is running on port ${secrets.port}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
