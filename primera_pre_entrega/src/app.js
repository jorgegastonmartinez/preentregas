import express from "express";
import { ProductManager } from "../productManager.js";

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";

app.use(productsRouter);
app.use(cartsRouter)









// const productManager = new ProductManager('productos.json');
// productManager.addProduct("Producto1", "Descripción del producto", "ABC1423", 10.99, true, 100, "Electrónica", "ruta/thumbnail.jpg");



app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})