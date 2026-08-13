import express from "express";
import { protect } from "../middleware/authMiddlewares";
import { admin } from "../middleware/adminMiddleware";

const router = express.Router();

router.get("/", protect, admin, getAdminStats);

export default router;