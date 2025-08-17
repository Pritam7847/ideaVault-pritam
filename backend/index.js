import express from "express";
import mongoose from "mongoose";
import ideaRoutes from "./routes/ideaRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", ideaRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
