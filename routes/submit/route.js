import express from "express";
import Questions from "../../models/questions.js"; // Correct relative path

const router = express.Router();

// POST: Submit answers and calculate score
router.post("/", async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Answers array is required" });
    }

    // For performance, you might want to fetch all questions in one query
    const questionIds = answers.map((ans) => ans.question_id);
    const questions = await Questions.find({
      question_id: { $in: questionIds },
    });

    let score = 0;
    for (const ans of answers) {
      const question = questions.find((q) => q.question_id === ans.question_id);
      if (question && question.answer === ans.answer) {
        score++;
      }
    }

    res.status(200).json({
      score,
      total: answers.length,
      message: `You answered ${score} out of ${answers.length} questions correctly.`,
    });
  } catch (error) {
    console.error("Error processing submission:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
