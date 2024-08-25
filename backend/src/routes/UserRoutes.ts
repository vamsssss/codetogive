import express from "express";
import ListingController from "../controllers/ListingController";
import UserController from "../controllers/UserController";
import BroadcastController from "../controllers/BroadcastController"; 
import MatchingController from "../controllers/MatchingController";
import UserService from "../services/impl/UserServiceImpl"; 
import TelegramBroadcastService from "../services/impl/TelegramBroadcastServiceImpl"; 
import MatchingServiceImpl from "../services/impl/MatchingServiceImpl";

const router = express.Router();

// Instantiate the controller with the service implementation
const userController = new UserController(UserService);
const broadcastController = new BroadcastController(TelegramBroadcastService);
const matchingController = new MatchingController(MatchingServiceImpl);

// Define the routes
router.post("/users", userController.createUser); // Route to create a new user
router.delete("/users/:id", userController.deleteUser); // Route to delete a user by ID
router.post("/users/login", userController.login);

router.post("/broadcast/sendBroadcast", broadcastController.sendBroadcast);
router.get("/broadcast/getBroadcasts", broadcastController.getBroadcasts);

router.post("/match", matchingController.matchBeneficiaries);

router.post("/listings", ListingController.createListing);
router.delete("/listings/:id", ListingController.deleteListing);
router.get("/listings/:id", ListingController.getListing);

export default router;
