import mongoose from "mongoose";

const ChaptersSchema = new mongoose.Schema({
  chapter_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

export default mongoose.model("Chapters", ChaptersSchema);
