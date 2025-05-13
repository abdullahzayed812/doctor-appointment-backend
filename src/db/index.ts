import mysql, { Pool } from "mysql2/promise";
import fs from "fs";
import path from "node:path";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Database {
  private static instance: Pool;

  private constructor() {}

  public static getInstance(): Pool {
    if (!Database.instance) {
      Database.instance = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 10,
      });
    }

    return Database.instance;
  }

  public static async runMigrations() {
    const pool = this.getInstance();
    const migrationPath = path.join(__dirname, "migrations");
    const files = fs.readdirSync(migrationPath).sort();

    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationPath, file), "utf8");
      console.log(`Running migration: ${file}`);
      await pool.query(sql);
    }

    console.log("✅ Migrations completed.");
  }

  public static async runSeeds() {
    const pool = this.getInstance();
    const seedPath = path.join(__dirname, "seeds");
    const files = fs.readdirSync(seedPath).sort();

    for (const file of files) {
      const sql = fs.readFileSync(path.join(seedPath, file), "utf8");
      console.log(`Seeding data: ${file}`);
      await pool.query(sql);
    }

    console.log("✅ Seeding completed.");
  }
}
