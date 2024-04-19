import { Router } from "express";
import { ProductManager } from "../../productManager.js";

const router = Router();

const productManager = new ProductManager('primera_pre_entrega/src/productos.json');
productManager.addProduct(
  "Producto1",
  "Descripción del producto",
  "ABC123",
  10.99,
  true,
  100,
  "Electrónica",
  "ruta/thumbnail.jpg"
);
productManager.addProduct(
  "Producto 2",
  "Descripción del producto 2",
  "ABC12355",
  10.99,
  true,
  100,
  "Electrónica",
  "ruta/thumbnail.jpg"
);

router.get("/api/products", async (req, res) => {
    try {
        const product = await productManager;
        const limit = parseInt(req.query.limit);
        const result = limit ? product.slice(0, limit) : product;

        res.json(result);

    } catch (error) {
        console.error("Error al obtener los productos", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

router.get("/api/products/:pid", async (req, res) => {
    const products = await productManager.getProducts();
    let pid = parseInt(req.params.pid);
    let product = products.find(prod => prod.id === pid)

    if (!product) return res.send({error: `El producto con el ID ${pid} no fue encontrado`})

    res.send({product})
})

export default router;