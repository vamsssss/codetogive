import express from "express";
import userRoutes from "./src/routes/UserRoutes"; // Adjust the path as needed
import cors from "cors";

const app = express();

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Middleware to enable CORS

// Use the user routes
app.use("/api", userRoutes); // '/api/users' will now handle the user-related requests

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
