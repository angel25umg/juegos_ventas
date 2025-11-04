// index.js
// Importamos el modulo express 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Importamos modelos
const db = require("./app/models");


// Sincronizamos la base de datos (force: false para mantener datos existentes)
db.sequelize.sync({ force: false }).then(() => {
  console.log("Base de datos sincronizada.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "UMG Web Application" });
});

// Importamos todas las rutas
require("./app/routes/clientes.routes")(app);
require("./app/routes/empleados.routes")(app);
require("./app/routes/proveedores.routes")(app);
require("./app/routes/videojuegos.routes")(app);
require("./app/routes/pedidos.routes")(app);
require("./app/routes/pagos.routes")(app);
require("./app/routes/resenas.routes")(app);
require("./app/routes/logros.routes")(app);
require("./app/routes/clientelogros.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
