const pool = require('../config/db');

const Usuario = {
  async create(nombre, correo, contrasena) {
    const [result] = await pool.query(
      "INSERT INTO usuario (nombre, correo_electronico, contrasena) VALUES (?, ?, ?)",
      [nombre, correo, contrasena]
    );
    return result.insertId;
  },

  async findByEmail(correo) {
    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE correo_electronico = ?",
      [correo]
    );
    return rows[0];
  },

  async findById(id) {
    const [rows] = await pool.query(
      "SELECT id_usuario, nombre, correo_electronico FROM usuario WHERE id_usuario = ?",
      [id]
    );
    return rows[0];
  },

  async findAll() {
    const [rows] = await pool.query("SELECT * FROM usuario");
    return rows;
  }
};

module.exports = Usuario;
