import { Request, Response } from "express";
import IUserService from "../services/IUserService";

export class UserController {
  constructor(private userService: IUserService) {}

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).send(user);
    } catch (err) {
      res.status(500).send((err as Error).message);
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.updateUser(
        parseInt(req.params.id, 10),
        req.body
      );
      if (user) {
        res.send(user); // to change this
      } else {
        res.status(404).send("User not found");
      }
    } catch (err) {
      res.status(500).send((err as Error).message);
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.deleteUser(
        parseInt(req.params.id, 10)
      );
      if (user) {
        res.send(user); // to change this
      } else {
        res.status(404).send("User not found");
      }
    } catch (err) {
      res.status(500).send((err as Error).message);
    }
  };

  getUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.getUser(parseInt(req.params.id, 10));
      if (user) {
        res.send(user); // similar to the others, you might want to change this if necessary
      } else {
        res.status(404).send("User not found");
      }
    } catch (err) {
      res.status(500).send((err as Error).message);
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await this.userService.findUserByEmail(email);
      console.log(user);
      if (!user) {
        res.status(401).send("Invalid email or password");
        return;
      }

      // Validate the password
      const isPasswordValid = await this.userService.validatePassword(
        password,
        user.password
      );
      if (!isPasswordValid) {
        res.status(401).send("Invalid email or password");
        return;
      }

      // Generate a JWT token
      const token = await this.userService.generateToken(user);

      // Return the user and the token
      res.status(200).json({ user, token });
    } catch (err) {
      res.status(500).send((err as Error).message);
    }
  };
}
