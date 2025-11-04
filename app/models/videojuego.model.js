// models/videojuego.model.js
module.exports = (sequelize, Sequelize) => {
    const Videojuego = sequelize.define("videojuego", {
        titulo: { type: Sequelize.STRING },
        genero: { type: Sequelize.STRING },
        plataforma: { type: Sequelize.STRING },
        edad_recomendada: { type: Sequelize.INTEGER },
        existencias: { type: Sequelize.INTEGER }, // para copias físicas
        licencias_digitales: { type: Sequelize.INTEGER }, // para copias digitales
        precio: { type: Sequelize.FLOAT },
        trailer_url: { type: Sequelize.STRING }, // integración Twitch/YouTube
        status: { type: Sequelize.BOOLEAN }
    });
    return Videojuego;
};

