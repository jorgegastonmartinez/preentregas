import { Router } from "express";
import productsModel from "../models/product.model.js";
import cartsModel from "../models/cart.model.js";

const router = Router();

router.get("/", async (req, res) => {
    res.render("index", {})
});

router.get("/products", async (req, res) => {
    let page = parseInt(req.query.page);
    if (!page) page = 1;

    let result = await productsModel.paginate(
      {},
      { page, limit: 5, lean: true }
    )
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}`:'';
    result.isValid = !(page <= 0 || page > result.totalPages);
    res.render("products", result);
})

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;

  const cart = await cartsModel.findById(cid);

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }
  res.render("carts", cart);
});

export default router;
