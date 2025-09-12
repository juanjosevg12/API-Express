const Usuario = require("../models/user.model");
const bcrypt = require("bcryptjs");

async function getUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error("Error en getUsuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
}

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

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
};
