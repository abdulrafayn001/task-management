import secrets from "../../secrets"

export const __prod__ = secrets.environment === "production"
export const SALT_ROUNDS = 10

