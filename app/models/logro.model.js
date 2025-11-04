// models/logro.model.js
module.exports = (sequelize, Sequelize) => {
    const Logro = sequelize.define("logro", {
        nombre: { type: Sequelize.STRING },
        descripcion: { type: Sequelize.STRING },
        puntos: { type: Sequelize.INTEGER },
        tipo: { type: Sequelize.ENUM("COMPRA", "RESENA", "RECOMENDACION") }
    });
    return Logro;
};
