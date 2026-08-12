import express from "express";
import { protect } from "../middleware/authMiddlewares.js";
import { admin } from "../middleware/adminMiddleware.js";
import multer from "multer";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controller/productController.js";

const upload = multer({dest: "uploads/"});

const router = express.Router();

router.route("/")
  .get(getProducts)
  .post(protect, admin, upload.single("image"), createProduct);

router.route("/:id")
  .get(getProductById)
  .put(protect, admin, upload.single("image"), updateProduct)
  .delete(protect,admin, deleteProduct);

export default router;