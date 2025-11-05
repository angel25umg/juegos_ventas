const db = require("../models");
const Carrito = db.carritos;
const CarritoDetalle = db.carritoDetalles;
const Videojuego = db.videojuegos;

// Crear carrito para cliente
exports.create = async (req, res) => {
    try {
        if (!req.body.clienteId) {
            return res.status(400).send({ message: "clienteId es requerido." });
        }
        // Solo un carrito activo por cliente
        let carrito = await Carrito.findOne({ where: { clienteId: req.body.clienteId, estado: "ACTIVO" } });
        if (!carrito) {
            carrito = await Carrito.create({ clienteId: req.body.clienteId });
        }
        res.send(carrito);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Obtener carrito activo de cliente
exports.getByCliente = async (req, res) => {
    try {
        const carrito = await Carrito.findOne({ where: { clienteId: req.params.clienteId, estado: "ACTIVO" }, include: CarritoDetalle });
        if (!carrito) return res.status(404).send({ message: "Carrito no encontrado." });
        res.send(carrito);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Agregar producto al carrito
exports.addProducto = async (req, res) => {
    try {
        const { carritoId, videojuegoId, cantidad } = req.body;
        if (!carritoId || !videojuegoId || !cantidad) {
            return res.status(400).send({ message: "carritoId, videojuegoId y cantidad son requeridos." });
        }

        // Obtener precio actual del videojuego y calcular subtotal server-side
        const juego = await Videojuego.findByPk(videojuegoId);
        if (!juego) return res.status(400).send({ message: `Videojuego ${videojuegoId} no encontrado.` });
        const price = parseFloat(juego.precio) || 0;
        const qty = parseInt(cantidad, 10) || 0;
        const computedSubtotal = parseFloat((price * qty).toFixed(2));

        // Si ya existe el producto en el carrito, actualiza cantidad y subtotal recalculando
        let detalle = await CarritoDetalle.findOne({ where: { carritoId, videojuegoId } });
        if (detalle) {
            const newCantidad = parseInt(detalle.cantidad, 10) + qty;
            const newSubtotal = parseFloat((price * newCantidad).toFixed(2));
            detalle.cantidad = newCantidad;
            detalle.subtotal = newSubtotal;
            await detalle.save();
            return res.send(detalle);
        }

        // Si no existe, crea nuevo detalle usando subtotal calculado
        detalle = await CarritoDetalle.create({ carritoId, videojuegoId, cantidad: qty, subtotal: computedSubtotal });
        res.send(detalle);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Eliminar producto del carrito
exports.removeProducto = async (req, res) => {
    try {
        const { carritoId, videojuegoId } = req.body;
        if (!carritoId || !videojuegoId) {
            return res.status(400).send({ message: "carritoId y videojuegoId requeridos." });
        }
        const deleted = await CarritoDetalle.destroy({ where: { carritoId, videojuegoId } });
        res.send({ deleted });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Vaciar carrito
exports.clear = async (req, res) => {
    try {
        const { carritoId } = req.body;
        if (!carritoId) return res.status(400).send({ message: "carritoId requerido." });
        await CarritoDetalle.destroy({ where: { carritoId } });
        res.send({ message: "Carrito vaciado." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Completar carrito (checkout)
exports.checkout = async (req, res) => {
    try {
        const { carritoId } = req.body;
        if (!carritoId) return res.status(400).send({ message: "carritoId requerido." });
        const carrito = await Carrito.findByPk(carritoId);
        if (!carrito) return res.status(404).send({ message: "Carrito no encontrado." });
        carrito.estado = "COMPLETADO";
        await carrito.save();
        res.send({ message: "Carrito completado." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
