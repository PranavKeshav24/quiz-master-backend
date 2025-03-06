import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Import Routes
import chapterRoutes from "./routes/chapters/route.js";
import chapterByIdRoutes from "./routes/chapters/[id]/route.js";
import questionRoutes from "./routes/questions/route.js";
import questionByIdRoutes from "./routes/questions/[id]/route.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use("/api/chapters", chapterRoutes);
app.use("/api/chapters/:id", chapterByIdRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/questions/:id", questionByIdRoutes);

export default app;
