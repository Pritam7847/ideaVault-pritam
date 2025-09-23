import mongoose from "mongoose";
import Idea from "../model/ideaModel.js"; // Ensure correct path

// POST - Submit idea with optional image
export const submitIdea = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file); // Debug uploaded file

    const { name, email, title, description } = req.body;

    // Validation
    if (!name || !email || !title || !description) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newIdea = new Idea({
      name,
      email,
      title,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    const savedIdea = await newIdea.save();
    res.status(201).json(savedIdea);
  } catch (error) {
    res.status(500).json({ message: "Error submitting idea", error: error.message });
  }
};

// GET - All ideas
export const getAllIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.status(200).json(ideas);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ideas", error: error.message });
  }
};

// GET - Single idea by ID
export const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }
    res.status(200).json(idea);
  } catch (error) {
    res.status(500).json({ message: "Error fetching idea", error: error.message });
  }
};

// POST - Upvote idea
export const upvoteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    idea.upvotes += 1;
    await idea.save();
    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: "Error upvoting idea", error: error.message });
  }
};

// POST - Add comment
export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    idea.comments.push(comment);
    await idea.save();
    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error: error.message });
  }
};

// DELETE - Delete idea

export const deleteIdea = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting idea with ID:", id);

    // Validate ObjectId properly
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid idea ID" });
    };

    const deleted = await Idea.findByIdAndDelete(id);

    if (!deleted) {
      console.log("Idea not found in DB");
      return res.status(404).json({ message: "Idea not found" });
    }

    res.status(200).json({ message: "Idea deleted successfully" });
  } catch (error) {
    console.error("Error deleting idea:", error);
    res.status(500).json({ message: "Error deleting idea", error: error.message });
  }
};