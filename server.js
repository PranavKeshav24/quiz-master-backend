import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import Routes
import chapterRoutes from "./routes/chapters/route.js";
import chapterByIdRoutes from "./routes/chapters/[id]/route.js";
import questionRoutes from "./routes/questions/route.js";
import questionByIdRoutes from "./routes/questions/[id]/route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

// Routes
app.use("/api/chapters", chapterRoutes);
app.use("/api/chapters/:id", chapterByIdRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/questions/:id", questionByIdRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// 🚀 Instead of app.listen(), export the app for Vercel
export default app;
