// models/proveedor.model.js
module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define("proveedor", {
        nombre: { type: Sequelize.STRING },
        contacto: { type: Sequelize.STRING },
        contrato: { type: Sequelize.STRING }, // contrato/licencia de publicación
        status: { type: Sequelize.BOOLEAN }
    });
    return Proveedor;
};

