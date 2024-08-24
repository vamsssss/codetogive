import express from "express";
import userRoutes from "./src/routes/UserRoutes"; // Adjust the path as needed

const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Use the user routes
app.use("/api", userRoutes); // '/api/users' will now handle the user-related requests

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
