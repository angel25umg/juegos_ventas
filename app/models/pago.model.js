// models/pago.model.js
module.exports = (sequelize, Sequelize) => {
    const Pago = sequelize.define("pago", {
        pedidoId: { type: Sequelize.INTEGER }, // FK pedido
        metodo: { type: Sequelize.ENUM("STRIPE", "PAYPAL") },
        monto: { type: Sequelize.FLOAT },
        factura_digital: { type: Sequelize.STRING } // ID o ruta factura
    });
    return Pago;
};
