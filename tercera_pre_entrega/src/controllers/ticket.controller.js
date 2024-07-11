// aqui hay que ver varios puntos
// primero pasar user a dao seguramente
// modificar las rutas de las classes
// ver los metodos 
// seguir la idea de la clase arquitectura-completo




import mongoose from 'mongoose';
import Ticket from '../dao/ticket/ticket.dao.js'
import User from '../dao/user/user.dao.js'
import Product from '../dao/product/product.dao.js'
import Cart from "../dao/cart/cart.dao.js"

const ticketsService = new Ticket()
const usersService = new User()
const productsService = new Product()
const cartService = new Cart()

export const getTickets = async (req, res) => {
    try {
        let result = await ticketsService.getTickets()
        res.send({ status: "success", result })
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message })
    }
}

export const getTicketById = async (req, res) => {
    const { tid } = req.params
    try {
        let ticket = await ticketsService.getTicketById(tid)
        res.send({ status: "success", result: ticket })
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message })
    }
}

// Crear un nuevo ticket
export const createTicket = async (req, res) => {
    // const { user, products } = req.body
    try {

        const userId = req.session._id;
        if (!userId) {
            return res.status(400).send({ status: 'error', error: 'Usuario no autenticado' });
        }
  
       // Obtén el usuario
       const resultUser = await usersService.getUserById(userId);
       if (!resultUser) {
           return res.status(404).send({ status: 'error', error: 'User not found' });
       }

        // Obtén los productos
        let actualProducts = await productsService.getProductById(products)
        let sum = actualProducts.reduce((acc, product) => {
            acc += product.price
            return acc
        }, 0)

        // Genera un nuevo ticket
        let ticket = {
            amount: sum,
            purchaser: userId,
            products: actualProducts.map(product => product._id),
            status: "pending"
        }

        let ticketResult = await ticketsService.createTicket(ticket)
        await usersService.updateUser(user, resultUser)
        res.send({ status: "success", ticketResult })
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message })
    }
}

export const resolveTicket = async (req, res) => {
    const { resolve } = req.query
    const { tid } = req.params
    try {
        let ticket = await ticketsService.getTicketById(tid)
        if (!ticket) {
            return res.status(404).send({ status: "error", message: "Ticket not found" })
        }

        ticket.status = resolve
        await ticketsService.updateTicket(ticket._id, ticket)
        res.send({ status: "success", result: "Ticket resolved" })
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message })
    }
}


export const renderTicketPage = async (req, res) => {
    try {
        const userId = req.user._id;  // Asumiendo que tienes el ID del usuario en `req.user`
        
        // Obtener el carrito del usuario
        const { cart } = await cartService.getCartByUserId(userId);

        if (!cart) {
            return res.status(400).json({ message: "El carrito no existe" });
        }
        
        // Renderizar la vista del ticket con los datos del carrito
        res.render("ticket", { cart });
    } catch (error) {
        console.error("Error al renderizar la vista del ticket: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
