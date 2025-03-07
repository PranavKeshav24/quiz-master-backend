import express from "express";
import { v4 as uuidv4 } from "uuid";
import Chapters from "../../models/chapters.js"; // Ensure correct path

const router = express.Router();

// POST: Create a new chapter
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Chapter name is required" });
    }

    const newChapter = new Chapters({
      chapter_id: uuidv4(), // Generate unique ID
      name,
    });

    await newChapter.save();
    res.status(201).json({
      message: "Chapter created successfully",
      chapter: newChapter,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// GET: Retrieve all chapters
router.get("/", async (req, res) => {
  try {
    const chapters = await Chapters.find();
    res.status(200).json(chapters);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
