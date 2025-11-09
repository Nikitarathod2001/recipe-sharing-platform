import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectClodinary from "./config/cloudinary.js";
import recipeRouter from "./routes/recipeRouter.js";

const app = express();
const PORT = process.env.PORT;

connectDB();
connectClodinary();

app.use(express.json());
app.use(cors());

// --- api endpoints ---
app.use("/api/recipes", recipeRouter);


app.get("/", (req, res) => {
  res.send("Backend is working fine...");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});