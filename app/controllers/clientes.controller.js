// controllers/clientes.controller.js
const db = require("../models");
const Cliente = db.clientes;
const Op = db.Sequelize.Op;

// Create and Save a new Cliente (Registro)
exports.create = (req, res) => {
    if (!req.body.nombre || !req.body.correo || !req.body.password) {
        res.status(400).send({ message: "Nombre, correo y password son requeridos!" });
        return;
    }

    // NOTA: en producción guarda passwords hasheadas (bcrypt). Aquí es ejemplo simple.
    const cliente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        correo: req.body.correo,
        telefono: req.body.telefono,
        ingreso: req.body.ingreso,
        password: req.body.password,
        perfil: req.body.perfil ? req.body.perfil : null, // texto/brief
        historial_compras: req.body.historial_compras ? req.body.historial_compras : null, // JSON o array serializado
        reseñas: req.body.reseñas ? req.body.reseñas : null, // JSON
        status: req.body.status ? req.body.status : false
    };

    Cliente.create(cliente)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while creating the Cliente."
        }));
};

// Login (inicio de sesión) - ejemplo simple
exports.login = (req, res) => {
    const correo = req.body.correo;
    const password = req.body.password;
    if (!correo || !password) {
        res.status(400).send({ message: "Correo y password son requeridos." });
        return;
    }

    Cliente.findOne({ where: { correo: correo } })
        .then(user => {
            if (!user) return res.status(404).send({ message: "Cliente no encontrado." });
            // Comparación simple; en producción compara hash (bcrypt.compare)
            if (user.password === password) {
                // No se emite token aquí (opcional: JWT)
                res.send({ message: "Inicio de sesión exitoso.", cliente: user });
            } else {
                res.status(401).send({ message: "Credenciales inválidas." });
            }
        })
        .catch(err => res.status(500).send({ message: "Error en el proceso de login." }));
};

// Get profile by id (perfil)
exports.getProfile = (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id)
        .then(data => {
            if (!data) return res.status(404).send({ message: "Cliente no encontrado." });
            // ocultar password al devolver
            const cliente = data.toJSON();
            delete cliente.password;
            res.send(cliente);
        })
        .catch(err => res.status(500).send({ message: "Error retrieving Cliente with id=" + id }));
};

// Retrieve all Clientes
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Cliente.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Some error occurred while retrieving clients." }));
};

// Find a single Cliente with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id)
        .then(data => {
            if (!data) return res.status(404).send({ message: "Cliente no encontrado." });
            res.send(data);
        })
        .catch(err => res.status(500).send({ message: "Error retrieving Cliente with id=" + id }));
};

// Update a Cliente by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Cliente.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Cliente was updated successfully." });
            else res.send({ message: `Cannot update Cliente with id=${id}. Maybe Cliente was not found or req.body is empty!` });
        })
        .catch(err => res.status(500).send({ message: "Error updating Cliente with id=" + id }));
};

// Delete a Cliente with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Cliente.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Client was deleted successfully!" });
            else res.send({ message: `Cannot delete Client with id=${id}. El cliente no fue encontrado!` });
        })
        .catch(err => res.status(500).send({ message: "Could not delete Cliente with id=" + id }));
};

// Delete all Clientes from the database.
exports.deleteAll = (req, res) => {
    Cliente.destroy({ where: {}, truncate: false })
        .then(nums => res.send({ message: `${nums} Clients were deleted successfully!` }))
        .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all clients." }));
};

// find all active Clientes
exports.findAllStatus = (req, res) => {
    Cliente.findAll({ where: { status: true } })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Some error occurred while retrieving Cliente." }));
};
