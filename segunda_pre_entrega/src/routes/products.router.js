import { Router } from "express";
import productModel from "../models/product.model.js";

const router = Router();

router.get("/products", async (req, res) => {
    let { limit = 10, page = 1, sort, query } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    try {
        // construir filtro de busqueda
        let filter = {};
        if(query) {
            // buscar por categoria o disponibilidad
            filter = {
                $or: [
                    { category: query },
                    // comparar como boleano
                    { stock: { $gt: 0 } }
                ]
            }
        }

        // opciones de sorteo
        let sortOptions = {};
        if (sort) {
            sortOptions.price = sort === "asc" ? 1 : -1;
        }

        // obtener el total de productos que coincidan con el filtro
        const totalProducts = await productModel.countDocuments(filter);

        // calcular la paginacion
        const totalPages = Math.ceil(totalProducts / limit);
        const offset = (page - 1) * limit;

        // obtener los productos paginados
        const products = await productModel
            .find(filter)
            .sort(sortOptions)
            .skip(offset)
            .limit(limit);
        
        // construir la respuesta
        const response = {
            status: "success",
            payload: products,
            totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page +1 :null,
            page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1 ? `/products?limit=${limit}&page=${page - 1}&sort=${sort || ''}&query=${query || ''}` : null,
            nextLink: page < totalPages ? `/products?limit=${limit}&page=${page + 1}&sort=${sort || ''}&query=${query || ''}` : null
        };

        res.json(response);

    } catch (error) {
        console.error("Error al recuperar productos", error);
        res.status(500).json({status: "error", message: "Error Interno del Servidor"})
    }
});

router.get("/products/:pid", async (req, res) => {
    try {
        let {pid} = req.params;

        let product = await productModel.findById(pid);

        if (!product) {
            return res.status(400).send({error: "Producto no encontrado"})
        }
        res.send({result: "success", payload: product})

    } catch (error) {
        console.error("Error al obtener el producto");
        res.status(500).json({ error: "Error al obtener el producto" });
    }
})

router.post("/products", async (req, res) => {
    let {title, description, code, price, stock, category } = req.body;

    if(!title || !description || !code || !price || isNaN(stock) || !category){
        console.log("Debes completar todos los campos");
        return res.status(400).send({error: "Debes completar correctamente todos los campos"});
    }

    stock = Number(stock)
    if (stock <= 0) {
        console.log("El STOCK debe ser mayor que 0");
        return res.status(400).send({error: "el campo STOCK debe ser mayor que 0"});
    }

    try {
        const codeExists = await productModel.exists({ code: code });

        if (codeExists) {
            console.log("El campo code ya existe con ese número");
            return res.status(400).send({error: "El campo code ya existe con ese número"})
        }

        let result = await productModel.create({
          title,
          description,
          code,
          price,
          stock,
          category,
        });

        res.send({result: "success", playload: result});

    } catch (error) {
        console.error("Error al crear el producto", error);
        res.status(500).send({error: "Error al crear el producto"})
    }
})

router.put("/products/:pid", async (req, res) => {
    let {pid} = req.params;

    let productToUpdate = req.body;

    if (!productToUpdate.title || !productToUpdate.description || !productToUpdate.code || !productToUpdate.price || isNaN(productToUpdate.stock) || !productToUpdate.category) {
        res.send({status: "Error", error: "Debe completar todos los campos del producto"})
    }

    try {
        const existProduct = await productModel.findById(pid);
        if (!existProduct) {
            return res.status(400).send({error: "Producto no encontrado"})
        }

        const codeExists = await productModel.exists({
          _id: { $ne: pid },
          code: productToUpdate.code,
        });

        if (codeExists) {
            return res.status(400).send({error: "El campo code ya está siendo utilizado por otro producto"})
        }

        let result = await productModel.updateOne({_id: pid}, productToUpdate);

        res.send({result: "success", payload: result});

    } catch (error) {
        console.error("Error al actualizar el producto", error);
        res.status(500).send({ error: "Error al actualizar el producto" });
    }
})

router.delete("/products/:pid", async (req, res) => {
    try {
        let {pid} = req.params;
    let result = await productModel.deleteOne({ _id: pid });
    res.send({result: "success", payload: result});
    } catch (error) {
        console.error("El producto no se ha podido eliminar");
        res.status(500).send({error: "El producto no se ha podido eliminar"})
    }
});

export default router;