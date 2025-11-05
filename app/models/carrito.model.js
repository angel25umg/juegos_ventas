// models/carrito.model.js
module.exports = (sequelize, Sequelize) => {
    const Carrito = sequelize.define("carrito", {
        clienteId: { type: Sequelize.INTEGER }, // FK cliente
        estado: { type: Sequelize.ENUM("ACTIVO", "COMPLETADO"), defaultValue: "ACTIVO" }
    });
    return Carrito;
};
