const db = require("../models");
const Proveedor = db.proveedores;

// Crear proveedor
exports.create = (req, res) => {
    if (!req.body.nombre) return res.status(400).send({ message: "El nombre es requerido." });

    const proveedor = {
        nombre: req.body.nombre,
        contacto: req.body.contacto,
        contrato: req.body.contrato,
        status: req.body.status ? req.body.status : true
    };

    Proveedor.create(proveedor).then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};

// CRUD
exports.findAll = (req, res) => {
    Proveedor.findAll().then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};
exports.findOne = (req, res) => {
    Proveedor.findByPk(req.params.id).then(data => data ? res.send(data) : res.status(404).send({ message: "Proveedor no encontrado." }));
};
exports.update = (req, res) => {
    Proveedor.update(req.body, { where: { id: req.params.id } })
        .then(num => num == 1 ? res.send({ message: "Proveedor actualizado" }) : res.send({ message: "No se pudo actualizar." }));
};
exports.delete = (req, res) => {
    Proveedor.destroy({ where: { id: req.params.id } })
        .then(num => num == 1 ? res.send({ message: "Proveedor eliminado" }) : res.send({ message: "No se encontró." }));
};
