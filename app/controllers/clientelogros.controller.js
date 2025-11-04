const db = require("../models");
const ClienteLogro = db.clienteLogros;

exports.create = (req, res) => {
    if (!req.body.clienteId || !req.body.logroId) {
        return res.status(400).send({ message: "Cliente y Logro requeridos." });
    }

    ClienteLogro.create({
        clienteId: req.body.clienteId,
        logroId: req.body.logroId,
        fecha_obtenido: req.body.fecha_obtenido
    }).then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};


exports.findAll = (req, res) => {
    ClienteLogro.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    ClienteLogro.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({ message: `No se encontró el cliente-logro con id=${id}.` });
            }
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
    const id = req.params.id;
    ClienteLogro.update(req.body, { where: { id: id } })
        .then(num => {
            if (num[0] === 1) {
                res.send({ message: "Cliente-logro actualizado correctamente." });
            } else {
                res.status(404).send({ message: `No se pudo actualizar el cliente-logro con id=${id}.` });
            }
        })
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
    const id = req.params.id;
    ClienteLogro.destroy({ where: { id: id } })
        .then(num => {
            if (num === 1) {
                res.send({ message: "Cliente-logro eliminado correctamente." });
            } else {
                res.status(404).send({ message: `No se pudo eliminar el cliente-logro con id=${id}.` });
            }
        })
        .catch(err => res.status(500).send({ message: err.message }));
};
