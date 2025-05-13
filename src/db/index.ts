import mysql, { Pool } from "mysql2/promise";
import fs from "fs";
import path from "node:path";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config();

export class Database {
  private static instance: Pool;
  private static readonly __filename = fileURLToPath(import.meta.url);
  private static readonly __dirname = path.dirname(this.__filename);

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

    // Ensure migrations_log table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations_log (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const migrationPath = path.join(this.__dirname, "migrations");
    const files = fs.readdirSync(migrationPath).sort();

    for (const file of files) {
      const [rows] = await pool.query("SELECT 1 FROM migrations_log WHERE name = ?", [file]);

      if ((rows as any[]).length === 0) {
        const sql = fs.readFileSync(path.join(migrationPath, file), "utf8");
        console.log(`▶ Running migration: ${file}`);
        await pool.query(sql);
        await pool.query("INSERT INTO migrations_log (name) VALUES (?)", [file]);
      } else {
        console.log(`✔ Skipping already applied migration: ${file}`);
      }
    }

    console.log("✅ Migrations check completed.");
  }

  public static async runSeeds() {
    const pool = this.getInstance();

    // Ensure seeds_log table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS seeds_log (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const seedPath = path.join(__dirname, "seeds");
    const files = fs.readdirSync(seedPath).sort();

    for (const file of files) {
      const [rows] = await pool.query("SELECT 1 FROM seeds_log WHERE name = ?", [file]);

      if ((rows as any[]).length === 0) {
        const sql = fs.readFileSync(path.join(seedPath, file), "utf8");
        console.log(`▶ Seeding data: ${file}`);
        await pool.query(sql);
        await pool.query("INSERT INTO seeds_log (name) VALUES (?)", [file]);
      } else {
        console.log(`✔ Skipping already applied seed: ${file}`);
      }
    }

    console.log("✅ Seeding check completed.");
  }
}
