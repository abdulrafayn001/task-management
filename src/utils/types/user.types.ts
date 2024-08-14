export enum UserRoleEnum {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  EDITOR = "editor",
  VIEWER = "viewer",
}

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
}
