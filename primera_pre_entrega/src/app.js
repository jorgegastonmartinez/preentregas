import express from "express";

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";

app.use(productsRouter);
app.use(cartsRouter)




app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})