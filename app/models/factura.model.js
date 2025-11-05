// models/factura.model.js
module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define("factura", {
        numero: { type: Sequelize.STRING, unique: true },
        fecha: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        monto: { type: Sequelize.FLOAT },
        detalles: { type: Sequelize.JSON }, // array de productos y cantidades
        clienteId: { type: Sequelize.INTEGER },
        pedidoId: { type: Sequelize.INTEGER },
        estado: { type: Sequelize.STRING, defaultValue: "GENERADA" } // GENERADA, PAGADA, ANULADA
    });
    return Factura;
};
