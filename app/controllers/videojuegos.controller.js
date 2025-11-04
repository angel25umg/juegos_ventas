const db = require("../models");
const Videojuego = db.videojuegos;

// Crear videojuego
exports.create = (req, res) => {
    if (!req.body.titulo || !req.body.genero || !req.body.plataforma) {
        return res.status(400).send({ message: "Título, género y plataforma requeridos." });
    }

    const videojuego = {
        titulo: req.body.titulo,
        genero: req.body.genero,
        plataforma: req.body.plataforma,
        edad_recomendada: req.body.edad_recomendada,
        existencias: req.body.existencias,
        licencias_digitales: req.body.licencias_digitales,
        precio: req.body.precio,
        trailer_url: req.body.trailer_url,
        status: req.body.status ? req.body.status : true
    };

    Videojuego.create(videojuego).then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};

// CRUD
exports.findAll = (req, res) => {
    Videojuego.findAll().then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};
exports.findOne = (req, res) => {
    Videojuego.findByPk(req.params.id).then(data => data ? res.send(data) : res.status(404).send({ message: "Videojuego no encontrado." }));
};
exports.update = (req, res) => {
    Videojuego.update(req.body, { where: { id: req.params.id } })
        .then(num => num == 1 ? res.send({ message: "Videojuego actualizado" }) : res.send({ message: "No se pudo actualizar." }));
};
exports.delete = (req, res) => {
    Videojuego.destroy({ where: { id: req.params.id } })
        .then(num => num == 1 ? res.send({ message: "Videojuego eliminado" }) : res.send({ message: "No se encontró." }));
};

