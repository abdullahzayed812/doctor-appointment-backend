import express from "express";
import cors from "cors";
import { requestLoggerMiddleware } from "./middlewares/requestLogger";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";
import userRoutes from "./routes/userRoutes";

export async function createServer(logRequests: boolean = true) {
  const app = express();

  app.use(express.json());
  app.use(cors());

  if (logRequests) {
    app.use(requestLoggerMiddleware);
  }

  app.use("/api/users", userRoutes);

  app.use(errorHandlerMiddleware);

  return app;
}
