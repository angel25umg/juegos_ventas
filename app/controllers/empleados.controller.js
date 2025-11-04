const db = require("../models");
const Empleado = db.empleados;
const Op = db.Sequelize.Op;

// Crear Empleado
exports.create = (req, res) => {
    if (!req.body.nombre || !req.body.correo || !req.body.password) {
        res.status(400).send({ message: "Nombre, correo y password son requeridos!" });
        return;
    }

    const empleado = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        password: req.body.password,
        rol: req.body.rol ? req.body.rol : "SOPORTE",
        status: req.body.status ? req.body.status : true
    };

    Empleado.create(empleado)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error al crear empleado." }));
};

// Login simple
exports.login = (req, res) => {
    const { correo, password } = req.body;
    if (!correo || !password) return res.status(400).send({ message: "Correo y password requeridos." });

    Empleado.findOne({ where: { correo } })
        .then(emp => {
            if (!emp) return res.status(404).send({ message: "Empleado no encontrado." });
            if (emp.password === password) res.send({ message: "Login correcto", empleado: emp });
            else res.status(401).send({ message: "Credenciales inválidas." });
        })
        .catch(err => res.status(500).send({ message: "Error en login." }));
};

// CRUD básico
exports.findAll = (req, res) => {
    Empleado.findAll().then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};
exports.findOne = (req, res) => {
    Empleado.findByPk(req.params.id).then(data => data ? res.send(data) : res.status(404).send({ message: "Empleado no encontrado." }));
};
exports.update = (req, res) => {
    Empleado.update(req.body, { where: { id: req.params.id } })
        .then(num => num == 1 ? res.send({ message: "Empleado actualizado" }) : res.send({ message: "No se pudo actualizar." }));
};
exports.delete = (req, res) => {
    Empleado.destroy({ where: { id: req.params.id } })
        .then(num => num == 1 ? res.send({ message: "Empleado eliminado" }) : res.send({ message: "No se encontró." }));
};

