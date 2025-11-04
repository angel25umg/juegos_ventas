// routes/logros.routes.js
module.exports = app => {
    const logros = require("../controllers/logros.controller.js");
    var router = require("express").Router();

    router.post("/create", logros.create);
    router.get("/", logros.findAll);
    router.get("/:id", logros.findOne);
    router.put("/update/:id", logros.update);
    router.delete("/delete/:id", logros.delete);

    app.use("/api/logros", router);
};
