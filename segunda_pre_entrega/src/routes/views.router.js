import { Router } from "express";
import productsModel from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
    res.render("index", {})
});

router.get("/products", async (req, res) => {
    let page = parseInt(req.query.page);
    if (!page) page = 1;
    // lean es crucial para mostrar en handlebars, ya que evita la "hidratacion" del documento de mongoose,
    // esto hace que a handlebars llegue el documento como plain object y no como document
    let result = await productsModel.paginate(
      {},
      // al poner limit: 5 limito a mostrar 5 por pagina
      { page, limit: 5, lean: true }
    )
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}`:'';
    result.isValid = !(page <= 0 || page > result.totalPages);
    res.render("products", result);
})

export default router;
