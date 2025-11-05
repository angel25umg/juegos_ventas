// models/carrito.model.js
module.exports = (sequelize, Sequelize) => {
    const Carrito = sequelize.define("carrito", {
        clienteId: { type: Sequelize.INTEGER }, // FK cliente
        // Added CONVERTIDO to reflect lifecycle after conversion to pedido
        estado: { type: Sequelize.ENUM("ACTIVO", "COMPLETADO", "CONVERTIDO"), defaultValue: "ACTIVO" }
    });
    return Carrito;
};
