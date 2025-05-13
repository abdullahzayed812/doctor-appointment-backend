import express from "express";
import { authMiddleware, userController } from "../container";

const router = express.Router();

router.post("/register", authMiddleware.authenticate, authMiddleware.authorize(["patient"]), userController.register);

export default router;
