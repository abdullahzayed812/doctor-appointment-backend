import dotenv from "dotenv";
import { createServer } from "./server";
import { checkRequiredEnvVars } from "./utils/checkEnvVars";

(async () => {
  dotenv.config();

  const { ENV, PORT } = process.env;

  checkRequiredEnvVars(["ENV", "PORT", "DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"]);

  const server = await createServer();

  server.listen(PORT, () => console.log(`Listening on port ${PORT} in ${ENV} environment.`));
})();
