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
                    min: 1,
                },
            },
        ],
        required: true,
    },
    total: {
        type: Number,
        default: 0,
    },
});

cartsSchema.pre("find", function() {
    this.populate("products.product")
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;