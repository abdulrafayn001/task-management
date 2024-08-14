import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"
import { UserRoleEnum } from "./types"
import secrets from "../../secrets"
import { SALT_ROUNDS } from "../constants"

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export const generateToken = (userId: number, role: UserRoleEnum): string => {
  return jwt.sign({ userId, role }, secrets.jwtSecret as string, {
    expiresIn: "1d",
  })
}

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}
