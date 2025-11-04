// routes/clienteLogros.routes.js
module.exports = app => {
    const clienteLogros = require("../controllers/clientelogros.controller.js");
    var router = require("express").Router();

    router.post("/create", clienteLogros.create);
    router.get("/", clienteLogros.findAll);
    router.get("/:id", clienteLogros.findOne);
    router.put("/update/:id", clienteLogros.update);
    router.delete("/delete/:id", clienteLogros.delete);

    app.use("/api/clienteLogros", router);
};

