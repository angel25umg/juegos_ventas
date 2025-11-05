module.exports = app => {
    const carrito = require("../controllers/carrito.controller.js");
    const router = require("express").Router();

    router.post("/create", carrito.create);
    router.get("/cliente/:clienteId", carrito.getByCliente);
    router.post("/add-producto", carrito.addProducto);
    router.post("/remove-producto", carrito.removeProducto);
    router.post("/clear", carrito.clear);
    router.post("/checkout", carrito.checkout);

    app.use("/api/carrito", router);
};
