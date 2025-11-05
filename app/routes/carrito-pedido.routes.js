module.exports = app => {
    const cp = require("../controllers/carrito-pedido.controller.js");
    const router = require("express").Router();

    router.post("/carrito-to-pedido", cp.carritoToPedido);

    app.use("/api/carrito-pedido", router);
};
