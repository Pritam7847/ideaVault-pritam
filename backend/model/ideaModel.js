import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Student name
  email: { type: String, required: true }, // Student email
  title: { type: String, required: true }, // Idea title
  description: { type: String, required: true }, // Idea details
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  comments: { type: [String], default: [] }

});

const Idea = mongoose.model("Idea", ideaSchema);

export default Idea;
