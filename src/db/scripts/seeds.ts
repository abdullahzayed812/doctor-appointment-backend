import { Database } from "../";

(async () => {
  try {
    await Database.runSeeds();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
})();
