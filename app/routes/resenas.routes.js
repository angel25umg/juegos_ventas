module.exports = app => {
  const resenas = require("../controllers/resenas.controller.js");
  var router = require("express").Router();

  // ejemplo de rutas correctas
  router.post("/", resenas.create);
  router.get("/", resenas.findAll);
  router.get("/:id", resenas.findOne);
  router.put("/:id", resenas.update);
  router.delete("/:id", resenas.delete);

  app.use("/api/resenas", router);
};
