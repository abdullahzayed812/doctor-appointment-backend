import bcrypt from "bcrypt";
import { JwtPayload, JwtService } from "./JwtService";
import { AuthModel } from "../models/AuthModel";
import { LoginResponse } from "../types/apis";
import { IUser } from "../types/entities";

export interface IAuthService {
  registerUser(name: string, email: string, password: string, role?: string): Promise<number>;
  loginUser(email: string, password: string): Promise<LoginResponse>;
  findUserByEmail(email: string): Promise<IUser | null>;
  deleteUser(id: number): Promise<void>;
}

export class AuthService implements IAuthService {
  constructor(private userModel: AuthModel, private jwtService: JwtService) {}

  async registerUser(name: string, email: string, password: string, role?: string): Promise<number> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.createUser(name, email, hashedPassword);
  }

  async loginUser(email: string, password: string) {
    const user = await this.userModel.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Invalid credentials");

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role as "admin" | "doctor" | "patient",
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async findUserByEmail(email: string) {
    return this.userModel.findByEmail(email);
  }

  async deleteUser(id: number) {
    await this.userModel.deleteById(id);
  }
}
