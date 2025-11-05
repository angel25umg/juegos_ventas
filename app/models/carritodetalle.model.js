// models/carritodetalle.model.js
module.exports = (sequelize, Sequelize) => {
    const CarritoDetalle = sequelize.define("carrito_detalle", {
        carritoId: { type: Sequelize.INTEGER }, // FK carrito
        videojuegoId: { type: Sequelize.INTEGER }, // FK videojuego
        cantidad: { type: Sequelize.INTEGER },
        subtotal: { type: Sequelize.FLOAT }
    });
    return CarritoDetalle;
};
