const db = require("../models");
const Pago = db.pagos;


const Factura = db.facturas;
const Pedido = db.pedidos;
const DetallePedido = db.detallePedidos;

exports.create = async (req, res) => {
    try {
        if (!req.body.pedidoId || !req.body.metodo || !req.body.monto) {
            return res.status(400).send({ message: "Pedido, método y monto son requeridos." });
        }

        const pago = {
            pedidoId: req.body.pedidoId,
            metodo: req.body.metodo,
            monto: req.body.monto,
            factura_digital: req.body.factura_digital
        };

        // Registrar el pago
        const pagoCreado = await Pago.create(pago);
        console.log("Pago creado:", pagoCreado);

        // Buscar pedido y detalles
        const pedido = await Pedido.findByPk(req.body.pedidoId);
        if (!pedido) {
            console.error("Pedido no encontrado para factura");
            return res.status(404).send({ message: "Pedido no encontrado. No se puede crear factura." });
        }
        const clienteId = pedido.clienteId;
        const detallesPedido = await DetallePedido.findAll({ where: { pedidoId: pedido.id } });
        if (!detallesPedido || detallesPedido.length === 0) {
            console.error("No hay detalles de pedido para factura");
            return res.status(400).send({ message: "No hay detalles de pedido. No se puede crear factura." });
        }
        // Formatear detalles para la factura
        const detalles = detallesPedido.map(d => ({
            videojuegoId: d.videojuegoId,
            cantidad: d.cantidad,
            subtotal: d.subtotal
        }));
        // Generar número de factura único
        const numero = `F-${Date.now()}-${pedido.id}`;
        // Crear factura
        const factura = await Factura.create({
            numero,
            fecha: new Date(),
            monto: req.body.monto,
            detalles,
            clienteId,
            pedidoId: pedido.id,
            estado: "GENERADA"
        });
        console.log("Factura creada:", factura);

        res.send({ pago: pagoCreado, factura });
    } catch (err) {
        console.error("Error al crear pago/factura:", err);
        res.status(500).send({ message: err.message });
    }
};

exports.findAll = (req, res) => {
    Pago.findAll().then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};
exports.findOne = (req, res) => {
    Pago.findByPk(req.params.id).then(data => data ? res.send(data) : res.status(404).send({ message: "Pago no encontrado." }));
};
