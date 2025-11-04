// routes/videojuegos.routes.js
module.exports = app => {
    const videojuegos = require("../controllers/videojuegos.controller.js");
    var router = require("express").Router();

    router.post("/create", videojuegos.create);
    router.get("/", videojuegos.findAll);
    router.get("/:id", videojuegos.findOne);
    router.put("/update/:id", videojuegos.update);
    router.delete("/delete/:id", videojuegos.delete);

    app.use("/api/videojuegos", router);
};
