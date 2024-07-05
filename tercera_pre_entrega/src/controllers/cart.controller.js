import mongoose from "mongoose";
import CartDAO from '../dao/cart/cart.dao.js';

const cartDAO = new CartDAO();

export const createCart = async (req, res) => {
    try {
        const userId = req.session.user._id;
        if (!userId) {
            return res.status(400).json({ error: "El ID del usuario no está definido en la sesión" });
        }
        const { message, cart } = await cartDAO.createCartForUser(userId);

        if (message === "Ya existe un carrito para este usuario") {
            return res.json({ message, cart });
        }
        res.json({ message, cart });
    } catch (error) {
        console.error("Error al crear el carrito:", error);
        res.status(500).json({ error: "Ocurrió un error al crear el carrito" });
    }
};

export const getCart = async (req, res) => {
    try {
        const { cid } = req.params;
        if (!mongoose.Types.ObjectId.isValid(cid)) {
            return res.status(400).json({ error: "ID de carrito no válido" });
        }
        const { message, cart } = await cartDAO.getCartById(cid);
        
        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }
        res.status(200).json({ message, cart });
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).json({ error: "Ocurrió un error al obtener el carrito" });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ error: "ID de carrito o producto no válido" });
        }
        const { message, cart } = await cartDAO.addProductToCart(cid, pid, quantity);

        res.status(200).json({ message, cart });
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        res.status(500).json({ error: "Ocurrió un error al agregar producto al carrito" });
    }
};

export const removeProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ error: "ID de carrito o producto no válido" });
        }
        const { message, cart } = await cartDAO.removeProductFromCart(cid, pid);

        res.status(200).json({ message, cart });
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
        res.status(500).json({ error: "Ocurrió un error al eliminar producto del carrito" });
    }
};

export const updateCart = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        const { message, cart } = await cartDAO.updateCart(cid, products);
        return res.status(200).json({ message, cart });
    } catch (error) {
        console.error("Error al actualizar el carrito:", error.message);
        return res.status(500).json({ error: "Error al actualizar el carrito" });
    }
};

export const updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const { message, cart } = await cartDAO.updateProductQuantity(cid, pid, quantity);
        return res.status(200).json({ message, cart });
    } catch (error) {
        console.error('Error al actualizar la cantidad del producto en el carrito:', error.message);
        return res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito' });
    }
};

export const clearCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const { message, cart } = await cartDAO.clearCart(cid);
        return res.status(200).json({ message, cart });
    } catch (error) {
        console.error('Error al eliminar los productos del carrito:', error.message);
        return res.status(500).json({ error: 'Error al eliminar los productos del carrito' });
    }
};