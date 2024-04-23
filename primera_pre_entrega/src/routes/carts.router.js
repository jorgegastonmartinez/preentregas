import { Router } from "express";
import { CartsManager } from "../../cartManager.js";
import { ProductManager } from "../../productManager.js";

const router = Router();

const productManager = new ProductManager('primera_pre_entrega/src/productos.json');
const cartManager = new CartsManager('primera_pre_entrega/src/carritos.json', productManager);

router.post("/api/carts", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json({message: "Carrito creado correctamente", cart: newCart });
    } catch (error) {
        console.error("Error al crear el carrito:", error);
        res.status(500).json({error: "Ocurrió un error al crear el carrito"});
    }
});

router.get("/api/carts/:cid", async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);

        const cart = await cartManager.getCartById(cid);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado"})
        }

        const products = [];

        for (const item of cart.products) {
            const product = await productManager.getProductById(item.product);
                if (product) {
                    products.push(product);
                }
            }

        res.json({ products });

    } catch (error) {
        console.error("Error al obtener los productos del carrito", error);
        res.status(500).json({error: "Ocurrió un error al obtener los productos del carrito"})
    }
})

router.post("/api/carts/:cid/product/:pid", async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);

        const cart = await cartManager.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        const product = await productManager.getProductById(pid);
        if(!product) {
            return res.status(404).json({error: "Producto no encontrado"})
        }

        const existsProductIndex = cart.products.findIndex(item => item.id === product.id);

        if (existsProductIndex !== -1) {
            cart.products[existsProductIndex].quantity++;
        } else {
            const productToAdd = {
                id: product.id,
                quantity: 1
            };

            cart.products.push(productToAdd);
        }

        await cartManager.saveCarts();

        res.json({ message: "Producto añadido al carrito correctamente", cart });
    } catch (error) {
        console.error("Error al agregar producto al carrito", error);
        res.status(500).json({ error: "Ocurrió un error al agregar producto al carrito" });
    }
});

export default router;