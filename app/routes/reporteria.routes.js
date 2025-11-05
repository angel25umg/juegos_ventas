module.exports = app => {
    const reporteria = require("../controllers/reporteria.controller.js");
    const router = require("express").Router();

    router.get("/ventas-mensuales", reporteria.ventasMensuales);
    router.get("/top-clientes", reporteria.topClientes);

    app.use("/api/reporteria", router);
};
