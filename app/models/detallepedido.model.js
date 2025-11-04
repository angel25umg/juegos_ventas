// models/detallePedido.model.js
module.exports = (sequelize, Sequelize) => {
    const DetallePedido = sequelize.define("detalle_pedido", {
        pedidoId: { type: Sequelize.INTEGER }, // FK pedido
        videojuegoId: { type: Sequelize.INTEGER }, // FK videojuego
        cantidad: { type: Sequelize.INTEGER },
        subtotal: { type: Sequelize.FLOAT }
    });
    return DetallePedido;
};
