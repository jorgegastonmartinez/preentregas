import { Router } from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:pid", getProductById);
router.post("/products", createProduct);
router.put("/products/:pid", updateProduct);
router.delete("/products/:pid", deleteProduct);

export default router;