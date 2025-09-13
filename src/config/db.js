const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Configuración de conexión a la base de datos MySQL usando `mysql2/promise`.
 * Utiliza variables de entorno para host, usuario, contraseña y nombre de la base de datos.
 * 
 * @constant {import('mysql2/promise').Pool} pool - Pool de conexiones reutilizable para consultas SQL.
 * 
 * @example
 * const pool = require('./config/db');
 * const [rows] = await pool.query('SELECT * FROM usuario');
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '1234',
  database: process.env.DB_NAME || 'instaleap'
});

module.exports = pool;
