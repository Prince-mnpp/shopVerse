import express from "express";
import { loginUser, getUsers, registerUser } from "../controller/authControllers.js";
import { protect } from "../middleware/authMiddlewares.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/users",protect, admin, getUsers);

export default router;