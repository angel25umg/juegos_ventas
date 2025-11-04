const db = require("../models"); // ✅ plural, no "../model"
const Resena = db.resenas;

exports.create = (req, res) => {
  if (!req.body.clienteId || !req.body.videojuegoId || !req.body.calificacion) {
    return res.status(400).send({ message: "Cliente, videojuego y calificación requeridos." });
  }

  Resena.create({
    clienteId: req.body.clienteId,
    videojuegoId: req.body.videojuegoId,
    comentario: req.body.comentario,
    calificacion: req.body.calificacion
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Resena.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Resena.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: "Reseña no encontrada." });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  Resena.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Reseña actualizada correctamente." });
      else res.send({ message: "No se pudo actualizar la reseña." });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Resena.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Reseña eliminada correctamente." });
      else res.send({ message: "No se pudo eliminar la reseña." });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
