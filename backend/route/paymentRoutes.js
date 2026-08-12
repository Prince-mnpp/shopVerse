import express from "express";
import { createOrder } from "../controller/paymentController";

const router = express.Router();

router.post('/order', createOrder);
router.post('/verify', verifyPayment);

export default router;