import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./route/authRoutes.js";
import { connectDB } from "./config/db.js";
import productRoutes from "./route/productRoutes.js";
import orderRoutes from "./route/orderRoutes.js";
import paymentRoutes from "./route/paymentRoutes.js";
import analyticsRoutes from "./route/analyticsRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure allowed origins for CORS
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

// Catch unhandled API routes before reaching static file serving
app.use('/api/*splat', (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Production Static File Serving
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Express 5 requires wildcard parameters to be named. This also matches '/'.
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('ShopVerse API is running in Development mode...');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
