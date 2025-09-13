const pool = require('../config/db');

/**
 * Modelo de usuario para interactuar con la base de datos.
 * @namespace Usuario
 */
const Usuario = {
  /**
   * Crea un nuevo usuario en la base de datos.
   * @param {string} nombre - Nombre del usuario.
   * @param {string} correo - Correo electrónico del usuario.
   * @param {string} contrasena - Contraseña del usuario (debe estar hasheada previamente).
   * @returns {Promise<number>} ID del usuario creado.
   * @example
   * const userId = await Usuario.create("Juan", "juan@example.com", "123456");
   */
  async create(nombre, correo, contrasena) {
    const [result] = await pool.query(
      "INSERT INTO usuario (nombre, correo_electronico, contrasena) VALUES (?, ?, ?)",
      [nombre, correo, contrasena]
    );
    return result.insertId;
  },

  /**
   * Busca un usuario por correo electrónico.
   * @param {string} correo - Correo electrónico del usuario.
   * @returns {Promise<Object|null>} Objeto con los datos del usuario o null si no existe.
   * @example
   * const user = await Usuario.findByEmail("juan@example.com");
   */
  async findByEmail(correo) {
    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE correo_electronico = ?",
      [correo]
    );
    return rows[0];
  },

  /**
   * Busca un usuario por su ID.
   * @param {number} id - ID del usuario.
   * @returns {Promise<Object|null>} Objeto con los datos del usuario (sin contraseña) o null si no existe.
   * @example
   * const user = await Usuario.findById(1);
   */
  async findById(id) {
    const [rows] = await pool.query(
      "SELECT id_usuario, nombre, correo_electronico FROM usuario WHERE id_usuario = ?",
      [id]
    );
    return rows[0];
  },

  /**
   * Obtiene todos los usuarios registrados en la base de datos.
   * @returns {Promise<Array<Object>>} Arreglo de objetos con los datos de los usuarios.
   * @example
   * const usuarios = await Usuario.findAll();
   */
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM usuario");
    return rows;
  }
};

module.exports = Usuario;
