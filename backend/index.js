import dotenv from "dotenv";
import cors from "cors";
import express, { application } from "express";
import authRoutes from "./route/authRoutes.js";
import { connectDB } from "./config/db.js";
import productRoutes from "./route/productRoutes.js";
import orderRoutes from "./route/orderRoutes.js";
import paymentRoutes from "./route/paymentRoutes.js";
import analyticsRoutes from "./route/analyticsRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', process.env.FRONTEND_URL],
  credentials: true
}));
app.use(express.json());

app.get("/", (req,res) => {
  res.send("hello there");
})

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

app.use("/api/auth/",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(Path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  })
} else {
  app.get('/', (req, res) => {
    res.send('ShopVerse API is running in Development mode...');
  });
}

app.use('/api/*', (req, res) => {
  res.status(404).json({message : "API route not found"});
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});