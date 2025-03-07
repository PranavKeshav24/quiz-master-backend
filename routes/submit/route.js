import express from "express";
import Questions from "../models/questions.js"; // Adjust path as needed

const router = express.Router();

// POST: Submit answers and calculate score
router.post("/", async (req, res) => {
  try {
    const { answers } = req.body;

    // Validate that an array of answers is provided
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Answers array is required" });
    }

    let score = 0;
    const total = answers.length;

    // Loop through each submitted answer
    // For better performance, you might fetch all questions in one query using $in
    for (const ans of answers) {
      // Check if answer is provided for a question
      if (!ans.question_id || ans.answer === undefined) continue;

      const question = await Questions.findOne({
        question_id: ans.question_id,
      });
      if (question && question.answer === ans.answer) {
        score++;
      }
    }

    res.status(200).json({
      score,
      total,
      message: `You answered ${score} out of ${total} questions correctly.`,
    });
  } catch (error) {
    console.error("Error processing submission:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
