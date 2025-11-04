// models/clienteLogro.model.js
module.exports = (sequelize, Sequelize) => {
    const ClienteLogro = sequelize.define("cliente_logro", {
        clienteId: { type: Sequelize.INTEGER }, // FK cliente
        logroId: { type: Sequelize.INTEGER }, // FK logro
        fecha_obtenido: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
    return ClienteLogro;
};
