const db = require("../models");
const Carrito = db.carritos;
const CarritoDetalle = db.carritoDetalles;

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
        const { carritoId, videojuegoId, cantidad, subtotal } = req.body;
        if (!carritoId || !videojuegoId || !cantidad || !subtotal) {
            return res.status(400).send({ message: "Todos los campos son requeridos." });
        }
        // Si ya existe el producto en el carrito, actualiza cantidad y subtotal
        let detalle = await CarritoDetalle.findOne({ where: { carritoId, videojuegoId } });
        if (detalle) {
            detalle.cantidad += cantidad;
            detalle.subtotal += subtotal;
            await detalle.save();
            return res.send(detalle);
        }
        // Si no existe, crea nuevo detalle
        detalle = await CarritoDetalle.create({ carritoId, videojuegoId, cantidad, subtotal });
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
