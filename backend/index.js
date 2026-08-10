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

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

app.use("/api/auth/",authRoutes);
app.use("/api/products",productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});