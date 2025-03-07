import express from "express";
import Chapters from "../../../models/chapters.js"; // Fixed import

const router = express.Router();

// GET: Get a specific chapter
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Fix param extraction

  try {
    const chapter = await Chapters.findOne({ chapter_id: id });

    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    res.status(200).json(chapter); // Fixed response variable
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// PATCH: Update chapter details
router.patch("/:id", async (req, res) => {
  const { id } = req.params; // Fix param extraction
  const { name } = req.body;

  try {
    const updatedChapter = await Chapters.findOneAndUpdate(
      { chapter_id: id },
      { name },
      { new: true }
    );

    if (!updatedChapter)
      return res.status(404).json({ message: "Chapter not found" });

    res.status(200).json({
      message: "Chapter updated successfully",
      chapter: updatedChapter, // Fixed response object
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
