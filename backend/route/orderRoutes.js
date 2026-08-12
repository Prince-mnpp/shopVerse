import express from "express";
import { protect } from "../middleware/authMiddlewares.js";
import { admin } from "../middleware/adminMiddleware.js";
import { addOrderItems, getMyorders, getOrders, updateOrderStatus } from "../controller/orderController.js";

const router = express.Router();

router.route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders)

router.route("/myOrders")
  .get(protect, getMyorders)

router.route('/:id/status').put(protect, admin, updateOrderStatus);

export default router;