const db = require("../models");
const DetallePedido = db.detallePedidos;

// Crear detalle de pedido
exports.create = (req, res) => {
    if (!req.body.pedidoId || !req.body.videojuegoId || !req.body.cantidad || !req.body.subtotal) {
        return res.status(400).send({ message: "Todos los campos son requeridos." });
    }
    const detalle = {
        pedidoId: req.body.pedidoId,
        videojuegoId: req.body.videojuegoId,
        cantidad: req.body.cantidad,
        subtotal: req.body.subtotal
    };
    DetallePedido.create(detalle)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

// Obtener todos los detalles
exports.findAll = (req, res) => {
    DetallePedido.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

// Obtener detalle por id
exports.findOne = (req, res) => {
    DetallePedido.findByPk(req.params.id)
        .then(data => data ? res.send(data) : res.status(404).send({ message: "Detalle no encontrado." }))
        .catch(err => res.status(500).send({ message: err.message }));
};

// Actualizar detalle
exports.update = (req, res) => {
    DetallePedido.update(req.body, { where: { id: req.params.id } })
        .then(num => num == 1 ? res.send({ message: "Detalle actualizado" }) : res.send({ message: "No se pudo actualizar." }))
        .catch(err => res.status(500).send({ message: err.message }));
};

// Eliminar detalle
exports.delete = (req, res) => {
    DetallePedido.destroy({ where: { id: req.params.id } })
        .then(num => num == 1 ? res.send({ message: "Detalle eliminado" }) : res.send({ message: "No se encontró." }))
        .catch(err => res.status(500).send({ message: err.message }));
};
