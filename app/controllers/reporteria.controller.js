const db = require("../models");
const Pedido = db.pedidos;
const Cliente = db.clientes;
const Pago = db.pagos;
const { Sequelize } = db;

// Ventas mensuales realizadas (digitales y físicas)
exports.ventasMensuales = async (req, res) => {
    try {
        const { year } = req.query;
        const selectedYear = year ? parseInt(year) : new Date().getFullYear();
        // Agrupa por mes y tipo_entrega usando raw query para evitar problemas de alias
        const [results] = await db.sequelize.query(`
            SELECT 
                TO_CHAR(fecha, 'YYYY-MM') AS mes,
                tipo_entrega,
                COUNT(*) AS total_pedidos
            FROM pedidos
            WHERE EXTRACT(YEAR FROM fecha) = :year
            GROUP BY mes, tipo_entrega
            ORDER BY mes ASC;
        `, {
            replacements: { year: selectedYear },
            type: Sequelize.QueryTypes.SELECT
        });
        res.send(results);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Top clientes por volumen de compras
exports.topClientes = async (req, res) => {
    try {
        // Consulta raw: suma total de pagos por cliente
        const [results] = await db.sequelize.query(`
            SELECT c.id AS clienteId, c.nombre, c.apellido, c.correo, SUM(p.monto) AS total_compras
            FROM pagos p
            JOIN pedidos pd ON p."pedidoId" = pd.id
            JOIN clientes c ON pd."clienteId" = c.id
            GROUP BY c.id, c.nombre, c.apellido, c.correo
            ORDER BY total_compras DESC
            LIMIT 10;
        `, {
            type: Sequelize.QueryTypes.SELECT
        });
        res.send(results);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
