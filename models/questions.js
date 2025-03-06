import mongoose from "mongoose";

const QustionsSchema = new mongoose.Schema({
  question_id: { type: String, required: true, unique: true },
  question: { type: String, required: true },
  options: { type: Array, required: true },
  answer: { type: String, required: true },
  chapter_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Questions", QustionsSchema);
