import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/rate", async (req, res) => {
  try {
    const { ideaText } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Rate startup ideas from 1 to 10 based on creativity, impact, and feasibility.",
          },
          { role: "user", content: `Idea: ${ideaText}` },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAIKEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ rating: response.data.choices[0].message.content });
  } catch (error) {
    console.error("AI Rating Error:", error.response?.data || error.message);
    res.status(500).json({ rating: "Rating unavailable" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
