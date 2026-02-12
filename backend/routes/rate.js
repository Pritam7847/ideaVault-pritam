import express from "express";
import axios from "axios";
const router = express.Router();

// POST /api/rate
router.post("/", async (req, res) => {
  const { ideaText } = req.body;

  if (!ideaText) return res.status(400).json({ message: "Idea text is required" });

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an AI evaluator. Rate ideas from 1 to 10 based on creativity, feasibility, and impact. Respond briefly like 'Rating: 8/10'.",
          },
          {
            role: "user",
            content: ideaText,
          },
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAIKEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const rating = response.data.choices[0].message.content;
    res.json({ rating });
  } catch (err) {
    console.error("OpenAI Error:", err.message);
    res.status(500).json({ rating: "Rating unavailable" });
  }
});

export default router;
