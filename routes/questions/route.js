import express from "express";
import { v4 as uuidv4 } from "uuid";
import Questions from "../../models/questions.js"; // Ensure correct path

const router = express.Router();

// POST: Create a new question
router.post("/", async (req, res) => {
  try {
    const { question, options, answer, chapter_id } = req.body;

    if (!question || !options || !answer || !chapter_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuestion = new Questions({
      question_id: uuidv4(),
      question,
      options,
      answer,
      chapter_id,
    });

    await newQuestion.save();
    res.status(201).json({
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// GET: Retrieve all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Questions.find();
    res.status(200).json(questions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
