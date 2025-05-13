import { RowDataPacket } from "mysql2";
import { LoginResponse } from "./apis";

export interface IUser extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "patient" | "doctor" | "admin";
  created_at: Date;
}

export interface IUserService {
  registerUser(name: string, email: string, password: string, role?: string): Promise<number>;

  loginUser(email: string, password: string): Promise<LoginResponse>;

  findUserByEmail(email: string): Promise<IUser | null>;

  deleteUser(id: number): Promise<void>;
}
