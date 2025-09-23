import express from "express";
import { submitIdea, getAllIdeas, upvoteIdea, addComment, deleteIdea } from "../controllers/ideaController.js";

const router = express.Router();

// Define routes for ideas

router.post("/ideas", submitIdea);
router.get("/ideas", getAllIdeas);
router.post("/ideas/:id/upvote", upvoteIdea);
router.post("/ideas/:id/comment", addComment);
router.delete("/ideas/:id", deleteIdea);

export default router;
