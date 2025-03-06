import express from "express";
import Questions from "../../../models/questions.js";

const router = express.Router();

// GET a specific question by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Questions.findOne({ question_id: id });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "Error fetching question", error });
  }
});

// PATCH (Update) a specific question by ID
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedQuestion = await Questions.findOneAndUpdate(
      { question_id: id },
      { $set: updates },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error updating question", error });
  }
});

export default router;
