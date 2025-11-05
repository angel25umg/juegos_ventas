const db = require("../models");
const Pago = db.pagos;


const Factura = db.facturas;
const Pedido = db.pedidos;
const DetallePedido = db.detallePedidos;
const Videojuego = db.videojuegos;


exports.create = async (req, res) => {
    const sequelize = db.sequelize;
    const { pedidoId, metodo, monto, factura_digital } = req.body;
    if (!pedidoId || !metodo || !monto) {
        return res.status(400).send({ message: "Pedido, método y monto son requeridos." });
    }

    const t = await sequelize.transaction();
    try {
        // Buscar pedido y detalles dentro de la transacción
        const pedido = await Pedido.findByPk(pedidoId, { transaction: t });
        if (!pedido) {
            await t.rollback();
            console.error("Pedido no encontrado para factura");
            return res.status(404).send({ message: "Pedido no encontrado. No se puede crear factura." });
        }

        const detallesPedido = await DetallePedido.findAll({ where: { pedidoId: pedido.id }, transaction: t });
        if (!detallesPedido || detallesPedido.length === 0) {
            await t.rollback();
            console.error("No hay detalles de pedido para factura");
            return res.status(400).send({ message: "No hay detalles de pedido. No se puede crear factura." });
        }

        // Calcular total server-side basándose en el precio actual de los videojuegos
        let serverTotal = 0;
        const detalles = [];
        for (const d of detallesPedido) {
            const juego = await Videojuego.findByPk(d.videojuegoId, { transaction: t });
            if (!juego) {
                await t.rollback();
                return res.status(400).send({ message: `Videojuego ${d.videojuegoId} no encontrado.` });
            }
            const price = parseFloat(juego.precio) || 0;
            const cantidad = parseInt(d.cantidad, 10) || 0;

            // Verificar stock (existencias o licencias_digitales)
            if (typeof juego.existencias === 'number') {
                if (juego.existencias < cantidad) {
                    await t.rollback();
                    return res.status(409).send({ message: `Stock insuficiente para videojuego ${juego.id}. Disponibles: ${juego.existencias}` });
                }
                juego.existencias = juego.existencias - cantidad;
                await juego.save({ transaction: t });
            } else if (typeof juego.licencias_digitales === 'number') {
                if (juego.licencias_digitales < cantidad) {
                    await t.rollback();
                    return res.status(409).send({ message: `Licencias digitales insuficientes para videojuego ${juego.id}. Disponibles: ${juego.licencias_digitales}` });
                }
                juego.licencias_digitales = juego.licencias_digitales - cantidad;
                await juego.save({ transaction: t });
            }

            const subtotal = parseFloat((price * cantidad).toFixed(2));
            serverTotal += subtotal;
            detalles.push({ videojuegoId: d.videojuegoId, cantidad: cantidad, subtotal });
        }

        // Validación de monto (tolerancia para floats)
        const requestedMonto = parseFloat(monto);
        if (Math.abs(serverTotal - requestedMonto) > 0.01) {
            await t.rollback();
            return res.status(400).send({ message: `Monto inválido. Monto esperado: ${serverTotal.toFixed(2)}.` });
        }

        // Verificar idempotencia: si ya existe un pago para este pedido, abortar
        const existingPago = await Pago.findOne({ where: { pedidoId: pedido.id }, transaction: t });
        if (existingPago) {
            await t.rollback();
            return res.status(409).send({ message: 'Pago ya existe para este pedido.', pago: existingPago });
        }

        // Crear pago y factura dentro de la transacción
        const pago = {
            pedidoId: pedido.id,
            metodo,
            monto: serverTotal,
            factura_digital: factura_digital
        };

        const pagoCreado = await Pago.create(pago, { transaction: t });

        // Generar número de factura único
        const numero = `F-${Date.now()}-${pedido.id}`;

        const factura = await Factura.create({
            numero,
            fecha: new Date(),
            monto: serverTotal,
            detalles,
            clienteId: pedido.clienteId,
            pedidoId: pedido.id,
            estado: "GENERADA"
        }, { transaction: t });

        // Actualizar estado del pedido
        pedido.estado = "PAGADO";
        await pedido.save({ transaction: t });

        await t.commit();
        console.log("Pago y factura creados en transacción:", pagoCreado, factura);
        res.send({ pago: pagoCreado, factura });
    } catch (err) {
        await t.rollback();
        console.error("Error al crear pago/factura (transacción):", err);
        res.status(500).send({ message: err.message });
    }
};

exports.findAll = (req, res) => {
    Pago.findAll().then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};
exports.findOne = (req, res) => {
    Pago.findByPk(req.params.id).then(data => data ? res.send(data) : res.status(404).send({ message: "Pago no encontrado." }));
};
