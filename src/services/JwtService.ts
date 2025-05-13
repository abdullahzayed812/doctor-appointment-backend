import jwt, { type SignOptions } from "jsonwebtoken";

export interface JwtPayload {
  userId: number;
  email: string;
  role: "admin" | "doctor" | "patient";
}

export interface JwtConfig {
  secret: string;
  expiresIn?: string | undefined;
}

export class JwtService {
  private secret: string;
  private options: SignOptions;

  constructor(config: JwtConfig) {
    this.secret = config.secret;
    this.options = { expiresIn: (config.expiresIn as SignOptions["expiresIn"]) || "1d" };
  }

  sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.secret, this.options);
  }

  verify(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }
}
