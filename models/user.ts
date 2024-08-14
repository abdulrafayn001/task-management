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

export async function getUsers() {
  const db = getDatabase()
  return db.all<Pick<User, "name" | "email" | "role">>(
    "SELECT id, name, email, role FROM users"
  )
}

export async function getUser(id: number) {
  const db = getDatabase()
  return db.get<Pick<User, "name" | "email" | "role">>(
    "SELECT id, name, email, role FROM users WHERE id = ?",
    [id]
  )
}

export async function updateUser(id: number, user: Partial<User>) {
  const db = getDatabase()
  const { name, role } = user
  const result = await db.run(
    "UPDATE users SET name = COALESCE(?, name), role = COALESCE(?, role) WHERE id = ?",
    [name, role, id]
  )
  return result?.changes ? getUser(id) : undefined
}

export async function deleteUser(id: number) {
  const db = getDatabase()
  const user = await getUser(id)
  if (user) {
    await db.run("DELETE FROM users WHERE id = ?", [id])
  }
  return user
}
