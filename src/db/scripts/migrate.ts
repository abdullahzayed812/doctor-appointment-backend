import { Database } from "../";

(async () => {
  await Database.runMigrations();
})();
