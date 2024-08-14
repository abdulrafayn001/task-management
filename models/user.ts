import { getDatabase } from "../src/config/database"
import { User } from "../src/utils/types"

export async function createUser(user: User): Promise<number> {
  const db = getDatabase()
  const { name, email, password, role } = user
  const result = await db.run(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role]
  )
  return result.lastID!
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = getDatabase()
  return db.get<User>("SELECT * FROM users WHERE email = ?", [email])
}
