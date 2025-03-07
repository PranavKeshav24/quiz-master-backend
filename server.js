import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes
import chapterRoutes from "./routes/chapters/route.js";
import chapterByIdRoutes from "./routes/chapters/[id]/route.js";
import questionRoutes from "./routes/questions/route.js";
import questionByIdRoutes from "./routes/questions/[id]/route.js";
import submitRoutes from "./routes/submit/route.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to DB
connectDB().catch((error) => {
  console.error("Database connection failed:", error);
});

// Mount Routes
// Note: Mount both the base and the dynamic routes under the same base path to avoid conflicts.
app.use("/api/chapters", chapterRoutes);
app.use("/api/chapters", chapterByIdRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/questions", questionByIdRoutes);
app.use("/api/submit", submitRoutes);

// Local development: listen on a port if not in production.
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
