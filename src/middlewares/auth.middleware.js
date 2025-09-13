const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación para rutas protegidas.
 * Verifica la presencia y validez de un token JWT en el encabezado `Authorization`.
 * Si el token es válido, añade `req.userId` con el ID del usuario y llama a `next()`.
 * Si el token no es válido o no existe, retorna un error HTTP.
 * 
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @param {import('express').NextFunction} next - Función para pasar al siguiente middleware.
 * @returns {void} No retorna valor, responde directamente con JSON en caso de error.
 * 
 * @example
 * // Uso en una ruta protegida
 * const express = require('express');
 * const router = express.Router();
 * const authMiddleware = require('./auth.middleware');
 * 
 * router.get('/perfil', authMiddleware, (req, res) => {
 *   res.json({ userId: req.userId });
 * });
 */
function authMiddleware(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: "Token requerido" });

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token inválido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token expirado o inválido" });
  }
}

module.exports = authMiddleware;
