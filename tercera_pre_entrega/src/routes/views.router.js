import { Router } from "express";
import { isAuthenticated, isNotAuthenticated } from "../middleware/auth.js";

import {
  renderLogin,
  renderProducts,
  renderCart,
  renderLoginPage,
  renderRegisterPage,
} from "../controllers/views.controller.js";

const router = Router();

router.get("/", renderLogin);
router.get("/products", isAuthenticated, renderProducts);
router.get("/carts/:cid", renderCart);
router.get("/login", isNotAuthenticated, renderLoginPage);
router.get("/register", isNotAuthenticated, renderRegisterPage);

export default router;