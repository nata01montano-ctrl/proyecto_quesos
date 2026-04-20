const mysql = require('mysql2/promise');
const config = require('../env/mysqlConfig');

const pool = mysql.createPool(config);

module.exports = pool;


pool.getConnection()
  .then(conn => {
    console.log("Conectado a MySQL");
    conn.release();
  })
  .catch(err => {
    console.error("Error de conexión:", err);
  });
