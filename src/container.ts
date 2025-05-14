import { AuthService } from "./services/AuthService";
import { AuthController } from "./controllers/AuthController";
import { JwtService } from "./services/JwtService";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { AuthModel } from "./models/AuthModel";

const jwtService = new JwtService({
  secret: process.env.JWT_SECRET || "default_jwt_secret",
  expiresIn: "1d",
});

const authModel = new AuthModel();
const authService = new AuthService(authModel, jwtService);
const authController = new AuthController(authService);

const authMiddleware = new AuthMiddleware(jwtService);

export { jwtService, authController, authMiddleware };
