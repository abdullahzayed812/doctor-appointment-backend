import { RequestHandler } from "express";

export type WithError<T = {}> = T & { error: string };

export type ExpressHandler<ReqBody = any, ResBody = any, Params = any, Query = any> = RequestHandler<
  Params,
  Partial<WithError<ResBody>>,
  Partial<ReqBody>,
  Query
>;

export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  role?: string; // Optional, since role might not be required
}

export interface RegisterResponse {
  message: string;
  userId: number;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string; // The JWT token
  user: {
    id: number;
    name: string;
    email: string;
    role: "admin" | "doctor" | "patient"; // Can be customized based on your roles
  };
}
