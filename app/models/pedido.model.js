// models/pedido.model.js
module.exports = (sequelize, Sequelize) => {
    const Pedido = sequelize.define("pedido", {
        clienteId: { type: Sequelize.INTEGER }, // FK cliente
        fecha: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        direccion_envio: { type: Sequelize.STRING },
        tipo_entrega: { type: Sequelize.ENUM("DIGITAL", "FISICA") },
        estado: { 
            // Added 'PAGADO' to represent pedidos que ya fueron pagados
            type: Sequelize.ENUM("PENDIENTE", "ENVIANDO", "ENTREGADO", "PAGADO"),
            defaultValue: "PENDIENTE"
        }
    });
    return Pedido;
};
