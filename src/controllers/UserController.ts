import { Request, Response } from "express";
import { IUserService } from "../types/User";
import { ExpressHandler } from "../types/apis";

export class UserController {
  constructor(private userService: IUserService) {}

  public register: ExpressHandler = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
      const userId = await this.userService.registerUser(name, email, password, role);
      res.status(201).json({ message: "User registered", userId });
      return;
    } catch (err) {
      res.status(500).json({ error: "Registration failed", details: err });
    }
  };
}
