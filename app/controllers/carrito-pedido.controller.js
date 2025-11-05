const db = require("../models");
const Carrito = db.carritos;
const CarritoDetalle = db.carritoDetalles;
const Pedido = db.pedidos;
const DetallePedido = db.detallePedidos;

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
        // Crear pedido
        const pedido = await Pedido.create({
            clienteId: carrito.clienteId,
            fecha: new Date(),
            direccion_envio,
            tipo_entrega,
            estado: "PENDIENTE"
        });
        // Obtener productos del carrito
        const productos = await CarritoDetalle.findAll({ where: { carritoId } });
        // Crear detalles de pedido
        for (const prod of productos) {
            await DetallePedido.create({
                pedidoId: pedido.id,
                videojuegoId: prod.videojuegoId,
                cantidad: prod.cantidad,
                subtotal: prod.subtotal
            });
        }
        res.send({ pedido });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
