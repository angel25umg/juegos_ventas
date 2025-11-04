const db = require("../models");
const Pedido = db.pedidos;
const DetallePedido = db.detallePedidos;

// Crear pedido con detalles
exports.create = (req, res) => {
    if (!req.body.clienteId || !req.body.tipo_entrega) {
        return res.status(400).send({ message: "Cliente y tipo de entrega son requeridos." });
    }

    Pedido.create({
        clienteId: req.body.clienteId,
        fecha: req.body.fecha,
        direccion_envio: req.body.direccion_envio,
        tipo_entrega: req.body.tipo_entrega,
        estado: req.body.estado || "PENDIENTE"
    }).then(pedido => {
        if (req.body.detalles && req.body.detalles.length > 0) {
            req.body.detalles.forEach(det => {
                DetallePedido.create({
                    pedidoId: pedido.id,
                    videojuegoId: det.videojuegoId,
                    cantidad: det.cantidad,
                    subtotal: det.subtotal
                });
            });
        }
        res.send(pedido);
    }).catch(err => res.status(500).send({ message: err.message }));
};

// CRUD pedidos
exports.findAll = (req, res) => {
    Pedido.findAll({ include: [DetallePedido] }).then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};
exports.findOne = (req, res) => {
    Pedido.findByPk(req.params.id, { include: [DetallePedido] }).then(data => data ? res.send(data) : res.status(404).send({ message: "Pedido no encontrado." }));
};
exports.update = (req, res) => {
    Pedido.update(req.body, { where: { id: req.params.id } })
        .then(num => num == 1 ? res.send({ message: "Pedido actualizado" }) : res.send({ message: "No se pudo actualizar." }));
};
exports.delete = (req, res) => {
    Pedido.destroy({ where: { id: req.params.id } })
        .then(num => num == 1 ? res.send({ message: "Pedido eliminado" }) : res.send({ message: "No se encontró." }));
};
