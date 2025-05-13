import { JwtService, JwtPayload } from "../services/JwtService";
import { ExpressHandler } from "../types/apis";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export class AuthMiddleware {
  constructor(private jwtService: JwtService) {}

  authenticate: ExpressHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized: No token" });
      return;
    }

    const token = authHeader.split(" ")[1];
    try {
      const payload = this.jwtService.verify(token);
      req.user = payload;
      next();
    } catch {
      res.status(401).json({ error: "Invalid or expired token" });
    }
  };

  authorize = (roles: JwtPayload["role"][]): ExpressHandler => {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        res.status(403).json({ error: "Forbidden: Not allowed" });
        return;
      }
      next();
    };
  };
}
