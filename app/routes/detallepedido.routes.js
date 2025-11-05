module.exports = app => {
    const detalle = require("../controllers/detallepedido.controller.js");
    const router = require("express").Router();

    router.post("/create", detalle.create);
    router.get("/", detalle.findAll);
    router.get("/:id", detalle.findOne);
    router.put("/:id", detalle.update);
    router.delete("/:id", detalle.delete);

    app.use("/api/detallepedidos", router);
};
