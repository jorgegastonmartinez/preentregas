import { Router } from "express";
import { isAuthenticated, isUser } from "../middleware/auth.js";
import {
    getProducts,
    getProductById,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/products", isAuthenticated, isUser, getProducts);
router.get("/products/:pid", isAuthenticated, isUser, getProductById);
// router.post("/products", isAuthenticated, isAdmin, createProduct);
// router.put("/products/:pid", isAuthenticated, isAdmin, updateProduct);
// router.delete("products/:pid", isAuthenticated, isAdmin, deleteProduct);

export default router;