import { Database } from "../";

(async () => {
  try {
    await Database.runMigrations();
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
})();
