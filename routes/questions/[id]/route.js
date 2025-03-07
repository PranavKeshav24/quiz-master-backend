import express from "express";
import Questions from "../../../models/questions.js"; // Ensure correct path

const router = express.Router();

// GET: Retrieve a specific question by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the URL
    const question = await Questions.findOne({ question_id: id }); // Query by `question_id`

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// PATCH: Update a question
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, answer, chapter_id } = req.body;

    const updatedQuestion = await Questions.findOneAndUpdate(
      { question_id: id },
      { question, options, answer, chapter_id },
      { new: true }
    );

    if (!updatedQuestion)
      return res.status(404).json({ message: "Question not found" });

    res.status(200).json({
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
