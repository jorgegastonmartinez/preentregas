import { Router } from "express";
import { isAdmin, isAuthenticated, isNotAuthenticated, isUser } from "../middleware/auth.js";

import {
  renderLogin,
  renderProducts,
  renderCart,
  renderLoginPage,
  renderRegisterPage,
  getProductsForAdmin
} from "../controllers/views.controller.js";
// import { getCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", renderLogin);
router.get("/products", isAuthenticated, isUser, renderProducts);
router.get("/carts/:cid", isAuthenticated, renderCart);
// router.get("/carts/:cid", isAuthenticated, getCart);
router.get("/login", isNotAuthenticated, renderLoginPage);
router.get("/register", isNotAuthenticated, renderRegisterPage);
router.get("/admin/products", isAuthenticated, isAdmin, getProductsForAdmin);

export default router;