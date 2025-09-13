const Usuario = require("../models/user.model");
const bcrypt = require("bcryptjs");

/**
 * Obtiene todos los usuarios registrados.
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía la lista de usuarios o un error HTTP 500 en caso de fallo.
 * @example
 * // GET /api/user
 */
async function getUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error("Error en getUsuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
}

/**
 * Obtiene un usuario específico por su ID.
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía los datos del usuario o un error HTTP 404/500.
 * @example
 * // GET /api/user/:id
 */
async function getUsuarioById(req, res) {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error: error.message });
  }
}

/**
 * Crea un nuevo usuario.
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía un mensaje de éxito con el ID del nuevo usuario o un error HTTP 400/500.
 * @example
 * // POST /api/user
 * // body: { "nombre": "Juan", "correo_electronico": "juan@example.com", "contrasena": "123456" }
 */
async function createUsuario(req, res) {
  const { nombre, correo_electronico, contrasena } = req.body;

  try {
    const existe = await Usuario.findByEmail(correo_electronico);
    if (existe) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const nuevoId = await Usuario.create(
      nombre,
      correo_electronico,
      hashedPassword
    );

    res.status(201).json({ message: "Usuario creado", id: nuevoId });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error: error.message });
  }
}

/**
 * Obtiene un usuario por su correo electrónico.
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía los datos del usuario o un error HTTP 404/500.
 * @example
 * // POST /api/user/email
 * // body: { "correo_electronico": "juan@example.com" }
 */
async function getUserByEmail(req, res){
  const { correo_electronico } = req.body;
  try {
    const user = await Usuario.findByEmail(correo_electronico);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error: error.message });
  }
}

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  getUserByEmail
};
