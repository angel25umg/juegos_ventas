module.exports = app => {
    const factura = require("../controllers/factura.controller.js");
    const router = require("express").Router();

    // Crear factura automáticamente tras pago
    router.post("/create-from-pago", factura.createFromPago);

    // CRUD básico
    router.get("/", factura.findAll);
    router.get("/:id", factura.findOne);

    app.use("/api/facturas", router);
};
