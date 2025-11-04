const db = require("../models");
const Pago = db.pagos;

exports.create = (req, res) => {
    if (!req.body.pedidoId || !req.body.metodo || !req.body.monto) {
        return res.status(400).send({ message: "Pedido, método y monto son requeridos." });
    }

    const pago = {
        pedidoId: req.body.pedidoId,
        metodo: req.body.metodo,
        monto: req.body.monto,
        factura_digital: req.body.factura_digital
    };

    Pago.create(pago).then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
    Pago.findAll().then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};
exports.findOne = (req, res) => {
    Pago.findByPk(req.params.id).then(data => data ? res.send(data) : res.status(404).send({ message: "Pago no encontrado." }));
};
