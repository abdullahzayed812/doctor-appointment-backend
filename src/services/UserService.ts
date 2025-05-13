import { UserModel } from "../models/UserModel";
import bcrypt from "bcrypt";
import { IUserService } from "../types/User";

export class UserService implements IUserService {
  private userModel = new UserModel();

  async registerUser(name: string, email: string, password: string, role?: string): Promise<number> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.createUser({ name, email, password: hashedPassword });
  }

  async findUserByEmail(email: string) {
    return this.userModel.findByEmail(email);
  }

  async deleteUser(id: number) {
    await this.userModel.deleteById(id);
  }
}
