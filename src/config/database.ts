import sqlite3 from "sqlite3"
import { Database, open } from "sqlite"

let db: Database

export async function initializeDatabase(): Promise<void> {
  try {
    db = await open({
      filename: "./database.sqlite",
      driver: sqlite3.Database,
    })

    console.log("Database connected")
    await createTables()
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
export function getDatabase(): Database {
  return db
}
