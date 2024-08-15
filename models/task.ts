import { getDatabase } from "../src/config/database"
import { Task } from "../src/utils/types"

const createTask = async (task: Task): Promise<Task> => {
  const { title, description, status, userId } = task
  const result = await getDatabase().run(
    "INSERT INTO tasks (title, description, status, userId) VALUES (?, ?, ?, ?)",
    [title, description, status, userId]
  )
  return { ...task, id: result.lastID }
}

const findTaskById = async (id: number) => {
  return getDatabase().get<Task>("SELECT * FROM tasks WHERE id = ?", [id])
}

const updateTask = async (id: number, task: Partial<Task>) => {
  const { title, description, status } = task
  const result = await getDatabase().run(
    "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
    [title, description, status, id]
  )

  return result?.changes ? findTaskById(id) : undefined
}

const deleteTask = async (id: number) => {
  await getDatabase().run("DELETE FROM tasks WHERE id = ?", [id])
}

const getAllTasks = async (userId: number) => {
  return getDatabase().all<Task[]>("SELECT * FROM tasks WHERE userId = ?", [
    userId,
  ])
}

export { createTask, findTaskById, updateTask, deleteTask, getAllTasks }
