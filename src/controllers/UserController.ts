import { Request, Response } from "express";
import { IUserService } from "../types/User";
import { ExpressHandler, LoginRequestBody, LoginResponse, RegisterRequestBody, RegisterResponse } from "../types/apis";

export class UserController {
  constructor(private userService: IUserService) {}

  public register: ExpressHandler<RegisterRequestBody, RegisterResponse> = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      res.status(400).json({ error: "Missing required fields." });
      return;
    }

    try {
      const userId = await this.userService.registerUser(name, email, password, role);
      res.status(201).json({ message: "User registered", userId });
    } catch (err) {
      res.status(500).json({ error: "Registration failed" });
    }
  };

  public login: ExpressHandler<LoginRequestBody, LoginResponse> = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Missing required fields." });
      return;
    }

    try {
      const result = await this.userService.loginUser(email, password);
      res.status(200).json(result);
    } catch (err) {
      res.status(401).json({ error: "Login failed" });
    }
  };
}
