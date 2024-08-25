import express from "express";
import UserController from "../controllers/UserController";
import BroadcastController from "../controllers/BroadcastController"; // Adjust the path as needed
import UserService from "../services/impl/UserServiceImpl"; // Import the service implementation
import TelegramBroadcastService from "../services/impl/TelegramBroadcastServiceImpl"; 

const router = express.Router();

// Instantiate the controller with the service implementation
const userController = new UserController(UserService);
const broadcastController = new BroadcastController(TelegramBroadcastService);

// Define the routes
router.post("/users", userController.createUser); // Route to create a new user
router.delete("/users/:id", userController.deleteUser); // Route to delete a user by ID
router.post("/users/login", userController.login);
router.post("/broadcast/sendBroadcast", broadcastController.sendBroadcast);
router.get("/broadcast/getBroadcasts", broadcastController.getBroadcasts);

export default router;