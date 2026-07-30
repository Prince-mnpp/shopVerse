import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import authRoutes from "./route/authRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/", (req,res) => {
  res.send("hello there");
})

app.use("/api/auth/",authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});