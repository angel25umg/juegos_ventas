// models/empleado.model.js
module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define("empleado", {
        nombre: { type: Sequelize.STRING },
        apellido: { type: Sequelize.STRING },
        correo: { type: Sequelize.STRING, unique: true },
        password: { type: Sequelize.STRING },
        rol: { 
            type: Sequelize.ENUM("ADMINISTRADOR", "VENDEDOR", "SOPORTE"),
            defaultValue: "SOPORTE"
        },
        status: { type: Sequelize.BOOLEAN }
    });
    return Empleado;
};
