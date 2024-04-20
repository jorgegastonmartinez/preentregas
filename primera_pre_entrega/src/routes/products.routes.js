import { Router } from "express";
import { ProductManager } from "../../productManager.js";

const router = Router();

const productManager = new ProductManager('primera_pre_entrega/src/productos.json');
productManager.addProduct(
  "BOCATA DE TORTILLA",
  "baguette, tortilla de papas, alioli y tomates secos",
  "ABC123",
  1800,
  true,
  100,
  "Bocatas",
  "ruta/thumbnail/bocata.jpg"
);
productManager.addProduct(
  "ENSALADA VEGETARIANA",
  "Descripción del producto 2",
  "scd12355",
  1600,
  true,
  140,
  "Ensaladas",
  "ruta/thumbnail/ensalada.jpg"
);

router.get("/api/products", async (req, res) => {
    try {
        const product = await productManager.getProducts();
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