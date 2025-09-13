const jwt = require('jsonwebtoken');

/**
 * Genera un token JWT para un usuario.
 * @param {string|number} userId - ID del usuario para el cual se genera el token.
 * @returns {string} Token JWT firmado.
 * @example
 * const token = generateToken(123);
 */
function generateToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES || "8h"
    }
  );
}

/**
 * Verifica y decodifica un token JWT.
 * @param {string} token - Token JWT a verificar.
 * @returns {Object} Objeto con la información decodificada del token.
 * @throws {Error} Lanza un error si el token es inválido o ha expirado.
 * @example
 * const data = verifyToken(token);
 */
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken };
