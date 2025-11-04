// models/cliente.model.js
module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
        nombre: { type: Sequelize.STRING },
        apellido: { type: Sequelize.STRING },
        direccion: { type: Sequelize.STRING },
        correo: { type: Sequelize.STRING, unique: true },
        telefono: { type: Sequelize.STRING },
        ingreso: { type: Sequelize.DATE },
        password: { type: Sequelize.STRING },
        perfil: { type: Sequelize.TEXT }, // info del perfil
        historial_compras: { type: Sequelize.JSON }, // array de compras
        reseñas: { type: Sequelize.JSON }, // reseñas y calificaciones
        status: { type: Sequelize.BOOLEAN }
    });
    return Cliente;
};
