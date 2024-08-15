export enum TaskStatus {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}

export type Task = {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId: number;
};
