// routes/empleados.routes.js
module.exports = app => {
    const empleados = require("../controllers/empleados.controller.js");
    var router = require("express").Router();

    router.post("/create", empleados.create);
    router.post("/login", empleados.login);
    router.get("/", empleados.findAll);
    router.get("/:id", empleados.findOne);
    router.put("/update/:id", empleados.update);
    router.delete("/delete/:id", empleados.delete);

    app.use("/api/empleados", router);
};
