import express from "express";
import { UserController } from "../controllers/UserController"; // Adjust the path as needed
import UserService from "../services/impl/UserServiceImpl"; // Import the service implementation

const router = express.Router();

// Instantiate the controller with the service implementation
const userController = new UserController(UserService);

// Define the routes
router.post("/users", userController.createUser); // Route to create a new user
router.put("/users/:id", userController.updateUser); // Route to update a user by ID
router.delete("/users/:id", userController.deleteUser); // Route to delete a user by ID
router.post("/users/login", userController.login);

export default router;
