import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";
import { JwtService } from "./services/JwtService";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";

const userService = new UserService();
const userController = new UserController(userService);

const jwtService = new JwtService({
  secret: process.env.JWT_SECRET || "default_jwt_secret",
  expiresIn: "1d",
});

const authMiddleware = new AuthMiddleware(jwtService);

export { jwtService, userController, authMiddleware };
