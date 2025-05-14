import { IDoctor } from "../types/entities";
import { DBClient } from "../utils/DBClient";

export class DoctorModel {
  private db: DBClient;

  constructor() {
    this.db = new DBClient();
  }

  async createDoctor(data: Omit<IDoctor, "id" | "createdAt" | "updatedAt">): Promise<number> {
    const result = await this.db.execute(
      "INSERT INTO doctors (userId, specialty, experience, qualifications, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [data.userId, data.specialty, data.experience, data.qualifications]
    );
    return result.insertId;
  }

  async getAll(): Promise<IDoctor[]> {
    return this.db.query<IDoctor[]>("SELECT * FROM doctors");
  }

  async findById(id: number): Promise<IDoctor | null> {
    const rows = await this.db.query<IDoctor[]>("SELECT * FROM doctors WHERE id = ?", [id]);
    return rows[0] || null;
  }

  async updateDoctor(id: number, data: Partial<Omit<IDoctor, "id" | "createdAt">>): Promise<void> {
    const fields = [];
    const values = [];

    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push((data as any)[key]);
    }

    fields.push(`updatedAt = NOW()`);
    values.push(id);

    await this.db.execute(`UPDATE doctors SET ${fields.join(", ")} WHERE id = ?`, values);
  }

  async deleteDoctor(id: number): Promise<void> {
    await this.db.execute("DELETE FROM doctors WHERE id = ?", [id]);
  }
}
