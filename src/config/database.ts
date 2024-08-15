import sqlite3 from "sqlite3"
import { Database, open } from "sqlite"
import { UserRoleEnum } from "../utils/types"
import { createUser } from "../../models"
import secrets from "../../secrets"
import { hashPassword } from "../utils/helperFunctions"


let db: Database

export async function initializeDatabase(): Promise<void> {
  try {
    db = await open({
      filename: "./database.sqlite",
      driver: sqlite3.Database,
    })

    console.log("Database connected")
    await createTables()
    await seedSuperUser()
  } catch (err) {
    console.error("Error opening database", err)
    throw err
  }
}

async function createTables(): Promise<void> {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `)

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL,
      userId INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users (id)
    )
  `)
}

async function seedSuperUser(): Promise<void> {
  const superUserEmail = secrets.superUserEmail
  const superUserPassword = secrets.superUserPassword

  const existingSuperUser = await db.get(
    "SELECT * FROM users WHERE email = ?",
    [superUserEmail]
  )

  if (!existingSuperUser) {
    const hashedPassword = await hashPassword(superUserPassword)

    await createUser({
      name: "Super Admin",
      email: superUserEmail,
      password: hashedPassword,
      role: UserRoleEnum.SUPER_ADMIN,
    })

    console.log("Super user seeded successfully")
  } else {
    console.log("Super user already exists")
  }
}

export function getDatabase(): Database {
  return db
}
