import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";
import { JwtService } from "./services/JwtService";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { UserModel } from "./models/UserModel";

const jwtService = new JwtService({
  secret: process.env.JWT_SECRET || "default_jwt_secret",
  expiresIn: "1d",
});

const userModel = new UserModel();
const userService = new UserService(userModel, jwtService);
const userController = new UserController(userService);

const authMiddleware = new AuthMiddleware(jwtService);

export { jwtService, userController, authMiddleware };
