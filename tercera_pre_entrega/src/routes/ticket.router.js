import { Router } from "express";
import { getTickets, getTicketById, createTicket, resolveTicket, renderTicketPage } from '../controllers/ticket.controller.js'

const router = Router()

router.get('/', getTickets)
router.post('/', createTicket)
router.get('/:oid', getTicketById)
router.put('/:oid', resolveTicket)

router.get('/view/new', renderTicketPage); // Nueva ruta para renderizar la vista del ticket


export default router;