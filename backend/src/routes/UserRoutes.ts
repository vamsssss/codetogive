import express from "express";
import { UserController } from "../controllers/UserController"; // Adjust the path as needed
import {UserService, TelegramService} from "../services/impl"; // Import the service implementation

const router = express.Router();

// Instantiate the controller with the service implementation
const userController = new UserController(UserService);
const broadcastController = new BroadcastController(TelegramService);

// Define the routes
router.post("/users", userController.createUser); // Route to create a new user
router.delete("/users/:id", userController.deleteUser); // Route to delete a user by ID
router.post("/users/login", userController.login);
router.post("/broadcast/sendBroadcast", broadcastController.sendMessage);
router.get("/broadcast/getBroadcasts", broadcastController.getBroadcasts);

export default router;