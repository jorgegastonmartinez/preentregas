import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'La cantidad debe ser al menos 1'],
                },
            },
        ],
        required: true,
    },
    total: {
        type: Number,
        required: true,
        default: 0,
    },
});

cartsSchema.pre("find", function() {
    this.populate("products.product")
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;