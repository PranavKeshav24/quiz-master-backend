import express from "express";
import Questions from "../../models/questions.js";

const router = express.Router();

// GET all Questions
router.get("/", async (req, res) => {
  try {
    const Questions = await Questions.find();
    res.status(200).json(Questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Questions", error });
  }
});

// POST a new question
router.post("/", async (req, res) => {
  try {
    const { question_id, question, options, answer, chapter_id } = req.body;

    // Check if all required fields exist
    if (!question_id || !question || !options || !answer || !chapter_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuestion = new Questions({
      question_id,
      question,
      options,
      answer,
      chapter_id,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error creating question", error });
  }
});

export default router;
