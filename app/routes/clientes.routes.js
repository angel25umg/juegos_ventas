// routes/clientes.routes.js
module.exports = app => {
    const clientes = require("../controllers/clientes.controller.js");
    var router = require("express").Router();

    router.post("/create", clientes.create);
    router.post("/login", clientes.login);
    router.get("/profile/:id", clientes.getProfile);
    router.get("/", clientes.findAll);
    router.get("/:id", clientes.findOne);
    router.put("/update/:id", clientes.update);
    router.delete("/delete/:id", clientes.delete);
    router.delete("/delete", clientes.deleteAll); // opcional, si implementas deleteAll

    app.use("/api/clientes", router);
};
