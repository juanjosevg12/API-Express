const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user.model');

/**
 * Controlador de autenticación.
 * Maneja registro, login y perfil de usuarios.
 * @namespace AuthController
 */
const AuthController = {
  /**
   * Registra un nuevo usuario.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   * @returns {void} Envía mensaje de éxito con el ID del usuario creado o error HTTP 400/500.
   * @example
   * // POST /api/auth/register
   * // body: { "nombre": "Juan", "correo_electronico": "juan@example.com", "contrasena": "123456" }
   */
  async register(req, res) {
    try {
      const { nombre, correo_electronico, contrasena } = req.body;

      const existe = await Usuario.findByEmail(correo_electronico);
      if (existe) return res.status(400).json({ message: "El usuario ya existe" });

      const hashedPassword = await bcrypt.hash(contrasena, 10);
      const id = await Usuario.create(nombre, correo_electronico, hashedPassword);

      res.status(201).json({ message: "Usuario creado", id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Inicia sesión de un usuario.
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   * @returns {void} Envía token JWT si las credenciales son válidas o error HTTP 401/404/500.
   * @example
   * // POST /api/auth/login
   * // body: { "correo_electronico": "juan@example.com", "contrasena": "123456" }
   */
  async login(req, res) {
    try {
      const { correo_electronico, contrasena } = req.body;

      const user = await Usuario.findByEmail(correo_electronico);
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

      const valid = await bcrypt.compare(contrasena, user.contrasena);
      if (!valid) return res.status(401).json({ message: "Credenciales inválidas" });

      const token = jwt.sign({ id: user.id_usuario }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ message: "Login exitoso", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Obtiene el perfil del usuario autenticado.
   * @param {import('express').Request} req - Objeto de solicitud de Express (req.userId debe existir).
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   * @returns {void} Envía datos del usuario o error HTTP 404/500.
   * @example
   * // GET /api/auth/profile
   */
  async profile(req, res) {
    try {
      const user = await Usuario.findById(req.userId);
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * Obtiene todos los usuarios (solo para fines administrativos).
   * @param {import('express').Request} req - Objeto de solicitud de Express.
   * @param {import('express').Response} res - Objeto de respuesta de Express.
   * @returns {void} Envía arreglo con todos los usuarios o error HTTP 500.
   * @example
   * // GET /api/auth/users
   */
  async getUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      console.error("Error REAL:", error);
      console.error("Error MESSAGE:", error.message);
      console.error("Error STRING:", String(error));
      res.status(500).json({ 
        error: error.message || String(error) || "Error desconocido" 
      });
    }
  }
};

module.exports = AuthController;
