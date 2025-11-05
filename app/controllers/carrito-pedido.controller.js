const db = require("../models");
const Carrito = db.carritos;
const CarritoDetalle = db.carritoDetalles;
const Pedido = db.pedidos;
const DetallePedido = db.detallePedidos;
const Videojuego = db.videojuegos;

// Convierte un carrito completado en pedido y detalles
exports.carritoToPedido = async (req, res) => {
    try {
        const { carritoId, direccion_envio, tipo_entrega } = req.body;
        if (!carritoId || !direccion_envio || !tipo_entrega) {
            return res.status(400).send({ message: "carritoId, direccion_envio y tipo_entrega son requeridos." });
        }
        const carrito = await Carrito.findByPk(carritoId);
        if (!carrito || carrito.estado !== "COMPLETADO") {
            return res.status(400).send({ message: "Carrito no existe o no está completado." });
        }
        // Crear pedido y detalles en una transacción; calcular subtotales server-side
        const sequelize = db.sequelize;
        const t = await sequelize.transaction();
        try {
            const pedido = await Pedido.create({
                clienteId: carrito.clienteId,
                fecha: new Date(),
                direccion_envio,
                tipo_entrega,
                estado: "PENDIENTE"
            }, { transaction: t });

            // Obtener productos del carrito dentro de la transacción
            const productos = await CarritoDetalle.findAll({ where: { carritoId }, transaction: t });

            // Crear detalles de pedido calculando subtotal desde el precio del videojuego
            for (const prod of productos) {
                const juego = await Videojuego.findByPk(prod.videojuegoId, { transaction: t });
                if (!juego) {
                    await t.rollback();
                    return res.status(400).send({ message: `Videojuego ${prod.videojuegoId} no encontrado.` });
                }
                const price = parseFloat(juego.precio) || 0;
                const cantidad = parseInt(prod.cantidad, 10) || 0;
                const subtotal = parseFloat((price * cantidad).toFixed(2));

                await DetallePedido.create({
                    pedidoId: pedido.id,
                    videojuegoId: prod.videojuegoId,
                    cantidad: cantidad,
                    subtotal: subtotal
                }, { transaction: t });
            }

            // Limpiar detalles del carrito y marcar carrito como convertido para evitar duplicados
            await CarritoDetalle.destroy({ where: { carritoId }, transaction: t });
            carrito.estado = "CONVERTIDO";
            await carrito.save({ transaction: t });

            await t.commit();
            res.send({ pedido });
        } catch (err) {
            await t.rollback();
            throw err;
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
