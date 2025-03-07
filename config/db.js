import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    // Use existing connection
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in your environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      // Options for mongoose 6+; no need for useNewUrlParser or useUnifiedTopology
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
