import express from "express";
import { protect } from "../middleware/authMiddlewares";
import { admin } from "../middleware/adminMiddleware";
import multer from "multer";

const upload = multer({dest: "uploads/"});

const router = express.Router();

router.route("/")
  .get(getProducts)
  .post(protect, admin, upload.single("image"), createProduct);

router.route("/:id")
  .get(getProductById)
  .put(protect, admin, upload.single("image"), updateProduct)
  .delete(protect,admin, deleteProuct);

export default router;