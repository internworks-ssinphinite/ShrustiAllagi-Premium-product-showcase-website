import express from "express";
import { listProducts, createProduct } from "../controllers/productController.js";

const router = express.Router();

// Public route
router.get("/", listProducts);

// Admin route (for now anyone can create)
router.post("/", createProduct);

export default router;
