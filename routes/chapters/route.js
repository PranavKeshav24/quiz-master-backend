import express from "express";
import { v4 as uuidv4 } from "uuid";
import Chapters from "../../models/chapters";

const router = express.Router();

// POST: Create a chapter
router.post("/", async (req, res) => {
  const { chapter_id, name } = req.body;
  try {
    const newChapter = new Chapters({
      chapter_id: uuidv4(),
      name,
    });

    await newChapter.save();
    res
      .status(201)
      .json({ message: "Chapter created successfully", Chapters: newChapter });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// GET: Get all Chapters
router.get("/", async (req, res) => {
  try {
    const chapter = await Chapters.find();

    res.status(200).json(chapter);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
