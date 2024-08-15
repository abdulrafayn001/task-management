import dotenv from "dotenv"
import { Secret } from "./src/utils/types"

dotenv.config()

const validateEnv = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`)
  }
  return value
}

const secrets: Secret = {
  port: validateEnv(process.env.PORT, "PORT"),
  environment: validateEnv(process.env.NODE_ENV, "NODE_ENV"),
  jwtSecret: validateEnv(process.env.JWT_SECRET, "JWT_SECRET"),
  superUserEmail: validateEnv(process.env.SUPER_USER_EMAIL, "SUPER_USER_EMAIL"),
  superUserPassword: validateEnv(
    process.env.SUPER_USER_PASSWORD,
    "SUPER_USER_PASSWORD"
  ),
}

export default secrets
