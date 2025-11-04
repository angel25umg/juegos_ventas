// models/index.js
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.resenas = require("./resenas.model.js")(sequelize, Sequelize);

module.exports = db;


db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importar modelos
db.clientes = require("./cliente.model.js")(sequelize, Sequelize);
db.empleados = require("./empleado.model.js")(sequelize, Sequelize);
db.proveedores = require("./proveedor.model.js")(sequelize, Sequelize);
db.videojuegos = require("./videojuego.model.js")(sequelize, Sequelize);
db.pedidos = require("./pedido.model.js")(sequelize, Sequelize);
db.detallePedidos = require("./detallepedido.model.js")(sequelize, Sequelize);
db.pagos = require("./pago.model.js")(sequelize, Sequelize);
db.resenas = require("./resenas.model.js")(sequelize, Sequelize);
db.logros = require("./logro.model.js")(sequelize, Sequelize);
db.clienteLogros = require("./clientelogro.model.js")(sequelize, Sequelize);

// aquí puedes definir las relaciones
// ejemplo:
db.clientes.hasMany(db.pedidos, { foreignKey: "clienteId" });
db.pedidos.belongsTo(db.clientes, { foreignKey: "clienteId" });

db.pedidos.hasMany(db.detallePedidos, { foreignKey: "pedidoId" });
db.detallePedidos.belongsTo(db.pedidos, { foreignKey: "pedidoId" });

db.videojuegos.hasMany(db.detallePedidos, { foreignKey: "videojuegoId" });
db.detallePedidos.belongsTo(db.videojuegos, { foreignKey: "videojuegoId" });

db.pedidos.hasOne(db.pagos, { foreignKey: "pedidoId" });
db.pagos.belongsTo(db.pedidos, { foreignKey: "pedidoId" });

db.clientes.belongsToMany(db.logros, { through: db.clienteLogros });
db.logros.belongsToMany(db.clientes, { through: db.clienteLogros });

module.exports = db;
