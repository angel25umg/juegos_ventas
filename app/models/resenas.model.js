// models/resena.model.js
module.exports = (sequelize, Sequelize) => {
    const Resena = sequelize.define("resena", {
        clienteId: { type: Sequelize.INTEGER }, // FK cliente
        videojuegoId: { type: Sequelize.INTEGER }, // FK videojuego
        comentario: { type: Sequelize.TEXT },
        calificacion: { type: Sequelize.INTEGER } // 1 a 5
    });
    return Resena;
};
