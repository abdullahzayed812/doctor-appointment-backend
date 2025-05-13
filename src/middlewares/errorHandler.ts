import { Request, Response, NextFunction } from "express";

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof Error ? 500 : 400;
  const message = err.message || "Internal Server Error";

  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
};
