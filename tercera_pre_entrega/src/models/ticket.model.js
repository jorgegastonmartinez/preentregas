import mongoose from "mongoose";

const collection = "Ticket"

const ticketSchema = new mongoose.Schema({
    number: Number,
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    },
    products: [],
    totalPrice: Number,
    status: { type: String }
})

const ticketModel = mongoose.model(collection, ticketSchema)

export default ticketModel;