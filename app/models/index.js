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
db.facturas = require("./factura.model.js")(sequelize, Sequelize);
db.carritos = require("./carrito.model.js")(sequelize, Sequelize);
db.carritoDetalles = require("./carritodetalle.model.js")(sequelize, Sequelize);

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

// Relación factura con cliente y pedido
db.clientes.hasMany(db.facturas, { foreignKey: "clienteId" });
db.facturas.belongsTo(db.clientes, { foreignKey: "clienteId" });
db.pedidos.hasOne(db.facturas, { foreignKey: "pedidoId" });
db.facturas.belongsTo(db.pedidos, { foreignKey: "pedidoId" });

// Relaciones de carrito
db.clientes.hasOne(db.carritos, { foreignKey: "clienteId" });
db.carritos.belongsTo(db.clientes, { foreignKey: "clienteId" });
db.carritos.hasMany(db.carritoDetalles, { foreignKey: "carritoId" });
db.carritoDetalles.belongsTo(db.carritos, { foreignKey: "carritoId" });
db.videojuegos.hasMany(db.carritoDetalles, { foreignKey: "videojuegoId" });
db.carritoDetalles.belongsTo(db.videojuegos, { foreignKey: "videojuegoId" });

module.exports = db;
