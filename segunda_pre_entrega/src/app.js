import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import dotenv from "dotenv";
import __dirname from "./utils";

import viewsRouter from "./routes/views.router.js";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Conectado exitosamente a la base de datos del ecommerse");
    })
    .catch((error) =>
        console.error("Error al intentar conectarse a la base de datos", error)
    );

app.use("/", viewsRouter);
app.use("/api", cartsRouter);
app.use("/api", productsRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})