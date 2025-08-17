import express from "express";
import { submitIdea, getAllIdeas, upvoteIdea, addComment } from "../controllers/ideaController.js";

const router = express.Router();

// Define routes for ideas

router.post("/ideas", submitIdea);
router.get("/ideas", getAllIdeas);
router.post("/ideas/:id/upvote", upvoteIdea);
router.post("/ideas/:id/comment", addComment);

export default router;
