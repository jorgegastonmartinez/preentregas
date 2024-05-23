import { Router } from "express";

const router = Router();

router.delete("/carts/:cid/products/:pid", async (req, res) => {
    // aqui va la logica para eliminar del carrito el producto seleccionado
})

router.put("/carts/:cid", async (req, res) => {
    // se debera actualizar el carrito con un arreglo de productos con el formato especificado anteriormete
})

router.put("/carts/:cid/products/:pid", async (req, res) => {
    // debera actualizar la cantidad de un producto en un carrito
})

router.delete("/carts/:cid", async (req, res) => {
    // debera elminar los productos del carrito seleccionado
})

export default router;