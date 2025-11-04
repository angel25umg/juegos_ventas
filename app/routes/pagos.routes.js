// routes/pagos.routes.js
module.exports = app => {
    const pagos = require("../controllers/pagos.controller.js");
    var router = require("express").Router();

    router.post("/create", pagos.create);
    router.get("/", pagos.findAll);
    router.get("/:id", pagos.findOne);

    app.use("/api/pagos", router);
};
