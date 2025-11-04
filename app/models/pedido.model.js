// models/pedido.model.js
module.exports = (sequelize, Sequelize) => {
    const Pedido = sequelize.define("pedido", {
        clienteId: { type: Sequelize.INTEGER }, // FK cliente
        fecha: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        direccion_envio: { type: Sequelize.STRING },
        tipo_entrega: { type: Sequelize.ENUM("DIGITAL", "FISICA") },
        estado: { 
            type: Sequelize.ENUM("PENDIENTE", "ENVIANDO", "ENTREGADO"),
            defaultValue: "PENDIENTE"
        }
    });
    return Pedido;
};
