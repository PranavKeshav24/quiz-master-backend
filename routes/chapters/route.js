import express from "express";
import chapters from "../../models/chapters.js"; // Updated import

const router = express.Router();

// GET: Get a specific chapter
router.get("/", async (req, res) => {
  const { chapter_id } = req.params;

  try {
    const chapter = await chapters.findOne({ chapter_id: chapter_id });

    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    res.status(200).json(chapter);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// PATCH: Update chapter details
router.patch("/", async (req, res) => {
  const { chapter_id } = req.params;
  const { name } = req.body;

  try {
    const updatedChapter = await chapters.findOneAndUpdate(
      { chapter_id: chapter_id },
      { name },
      { new: true }
    );

    if (!updatedChapter)
      return res.status(404).json({ message: "Chapter not found" });

    res.status(200).json({
      message: "Chapter updated successfully",
      chapters: updatedChapter,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
