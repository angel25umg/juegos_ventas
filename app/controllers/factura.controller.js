const db = require("../models");
const Factura = db.facturas;
const Pedido = db.pedidos;
const Cliente = db.clientes;

// Crear factura automáticamente tras pago
exports.createFromPago = async (req, res) => {
    try {
        const { pedidoId, monto } = req.body;
        if (!pedidoId || !monto) {
            return res.status(400).send({ message: "Pedido y monto son requeridos." });
        }
        // Buscar pedido y cliente
        const pedido = await Pedido.findByPk(pedidoId);
        if (!pedido) return res.status(404).send({ message: "Pedido no encontrado." });
        const clienteId = pedido.clienteId;
        // Generar número de factura único
        const numero = `F-${Date.now()}-${pedidoId}`;
        // Detalles: puedes obtener los productos del pedido
        const detalles = pedido.detalles || [];
        // Crear factura
        const factura = await Factura.create({
            numero,
            fecha: new Date(),
            monto,
            detalles,
            clienteId,
            pedidoId,
            estado: "GENERADA"
        });
        res.send(factura);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// CRUD básico
exports.findAll = (req, res) => {
    Factura.findAll().then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};
exports.findOne = (req, res) => {
    Factura.findByPk(req.params.id).then(data => data ? res.send(data) : res.status(404).send({ message: "Factura no encontrada." }));
};
