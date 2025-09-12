const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user.model');

const AuthController = {
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

  async profile(req, res) {
    try {
      const user = await Usuario.findById(req.userId);
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUsuarios(req, res) {
    try {
      console.log("ERROR REAL:", error);
      console.log("ERROR MESSAGE:", error.message);
      console.log("ERROR STRING:", String(error));
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ 
        error: error.message || String(error) || "Error desconocido" 
      });
    }
  }
};

module.exports = AuthController;