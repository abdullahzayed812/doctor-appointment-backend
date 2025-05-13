import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { Database } from "../db";

export class DBClient {
  private pool: Pool;

  constructor() {
    this.pool = Database.getInstance();
  }

  // For SELECT queries (returns typed rows)
  async query<T extends RowDataPacket[]>(sql: string, params: any[] = []): Promise<T> {
    const [rows] = await this.pool.query<T>(sql, params);
    return rows;
  }

  // For INSERT, UPDATE, DELETE (returns metadata)
  async execute(sql: string, params: any[] = []): Promise<ResultSetHeader> {
    const [result] = await this.pool.execute<ResultSetHeader>(sql, params);
    return result;
  }
}
