import { IUser } from "../types/User";
import { DBClient } from "../utils/DBClient";

export class UserModel {
  private db: DBClient;

  constructor() {
    this.db = new DBClient();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const rows = await this.db.query<IUser[]>("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
    return rows.length > 0 ? rows[0] : null;
  }

  async findById(id: number): Promise<IUser | null> {
    const rows = await this.db.query<IUser[]>("SELECT * FROM users WHERE id = ? LIMIT 1", [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  async getAll(): Promise<IUser[]> {
    return await this.db.query<IUser[]>("SELECT * FROM users");
  }

  async deleteById(id: number): Promise<void> {
    await this.db.execute("DELETE FROM users WHERE id = ?", [id]);
  }

  async createUser(name: string, email: string, password: string, role?: string): Promise<number> {
    const result = await this.db.execute("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [
      name,
      email,
      password,
      role ?? "patient",
    ]);
    return result.insertId;
  }
}
