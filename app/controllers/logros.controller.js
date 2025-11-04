const db = require("../models");
const Logro = db.logros;

exports.create = (req, res) => {
    if (!req.body.nombre || !req.body.tipo) {
        return res.status(400).send({ message: "Nombre y tipo son requeridos." });
    }

    Logro.create({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        puntos: req.body.puntos,
        tipo: req.body.tipo
    }).then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};


exports.findAll = (req, res) => {
    Logro.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Logro.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({ message: `No se encontró el logro con id=${id}.` });
            }
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
    const id = req.params.id;
    Logro.update(req.body, { where: { id: id } })
        .then(num => {
            if (num[0] === 1) {
                res.send({ message: "Logro actualizado correctamente." });
            } else {
                res.status(404).send({ message: `No se pudo actualizar el logro con id=${id}.` });
            }
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Logro.destroy({ where: { id: id } })
        .then(num => {
            if (num === 1) {
                res.send({ message: "Logro eliminado correctamente." });
            } else {
                res.status(404).send({ message: `No se pudo eliminar el logro con id=${id}.` });
            }
        })
        .catch(err => res.status(500).send({ message: err.message }));
};
