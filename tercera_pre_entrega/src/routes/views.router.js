import { Router } from "express";
import { isAdmin, isAuthenticated, isNotAuthenticated, isUser } from "../middleware/auth.js";

import {
  renderLogin,
  renderProducts,
  renderCart,
  renderLoginPage,
  renderRegisterPage,
  getProductsForAdmin,
  renderChat
} from "../controllers/views.controller.js";

const router = Router();

router.get("/", renderLogin);
router.get("/products", isAuthenticated, isUser, renderProducts);
router.get("/carts/:cid", renderCart);
router.get("/login", isNotAuthenticated, renderLoginPage);
router.get("/register", isNotAuthenticated, renderRegisterPage);

router.get("/admin/products", isAuthenticated, isAdmin, getProductsForAdmin);

router.get('/chat', isAuthenticated, renderChat); 


export default router;