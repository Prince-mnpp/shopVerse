import dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config();

const app = express();

app.get("/", (req,res) => {
  res.send("hello there");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});