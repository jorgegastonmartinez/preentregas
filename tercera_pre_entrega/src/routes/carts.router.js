import { Router } from "express";
import { isAuthenticated, isUser } from "../middleware/auth.js";
import {
    createCart,
    getCart,
    addProductToCart,
    removeProductFromCart,
    updateCart,
    updateProductQuantity,
    clearCart
} from "../controllers/cart.controller.js";
import { renderCart } from "../controllers/views.controller.js";

const router = Router();

router.post("/carts", isAuthenticated, createCart);
// router.get("/carts/:cid", isAuthenticated, getCart);

// router.get("/carts/:cid", isAuthenticated, renderCart)


router.post("/carts/:cid/products/:pid", isAuthenticated, isUser, addProductToCart);
router.delete("/carts/:cid/products/:pid", removeProductFromCart);
router.put("/carts/:cid", updateCart);
router.put("/carts/:cid/products/:pid", updateProductQuantity);
router.delete("/carts/:cid", clearCart);

export default router;