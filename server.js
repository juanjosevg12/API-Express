const app = require('./app');

/**
 * Puerto en el que se ejecutará el servidor.
 * Se toma de la variable de entorno PORT o, por defecto, 8080.
 * @type {number|string}
 */
const PORT = process.env.PORT || 8080;

console.log('=== INICIANDO SERVIDOR ===');
console.log('Puerto:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');

/**
 * Inicia el servidor Express en el puerto definido.
 * Muestra en consola todas las rutas disponibles de la API.
 * @param {number|string} PORT - Puerto donde se ejecuta el servidor.
 */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('Rutas disponibles:');

  // 🔹 Rutas de autenticación
  console.log('  POST   http://localhost:' + PORT + '/api/auth/register');
  console.log('  POST   http://localhost:' + PORT + '/api/auth/login');
  console.log('  GET    http://localhost:' + PORT + '/api/auth/profile (CON AUTH)');

  // 🔹 Rutas de usuarios
  console.log('  GET    http://localhost:' + PORT + '/api/user (CON AUTH)');
  console.log('  GET    http://localhost:' + PORT + '/api/user/:id (CON AUTH)');
  console.log('  POST   http://localhost:' + PORT + '/api/user/email');

  // 🔹 Rutas de tareas
  console.log('  GET    http://localhost:' + PORT + '/api/task (CON AUTH)');
  console.log('  GET    http://localhost:' + PORT + '/api/task/:id (CON AUTH)');
  console.log('  POST   http://localhost:' + PORT + '/api/task (CON AUTH)');
  console.log('  PUT    http://localhost:' + PORT + '/api/task/:id (CON AUTH)');
  console.log('  DELETE http://localhost:' + PORT + '/api/task/:id (CON AUTH)');

  // 🔹 Ruta de documentación Swagger
  console.log('  http://localhost:' + PORT + '/api-docs (Documentación Swagger)');
});
