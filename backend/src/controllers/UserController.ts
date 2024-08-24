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
}
