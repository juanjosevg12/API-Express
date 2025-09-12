const app = require('./app');
const PORT = process.env.PORT || 8080;

console.log('=== INICIANDO SERVIDOR ===');
console.log('Puerto:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('Rutas disponibles:');

  // Auth
  console.log('  POST   http://localhost:' + PORT + '/api/auth/register');
  console.log('  POST   http://localhost:' + PORT + '/api/auth/login');
  console.log('  GET    http://localhost:' + PORT + '/api/auth/profile (CON AUTH)');

  // Users
  console.log('  POST   http://localhost:' + PORT + '/api/user');
  console.log('  GET    http://localhost:' + PORT + '/api/user (CON AUTH)');
  console.log('  GET    http://localhost:' + PORT + '/api/user/:id (CON AUTH)');

  // Tasks
  console.log('  GET    http://localhost:' + PORT + '/api/task (CON AUTH)');
  console.log('  GET    http://localhost:' + PORT + '/api/task/:id (CON AUTH)');
  console.log('  POST   http://localhost:' + PORT + '/api/task (CON AUTH)');
  console.log('  PUT    http://localhost:' + PORT + '/api/task/:id (CON AUTH)');
  console.log('  DELETE http://localhost:' + PORT + '/api/task/:id (CON AUTH)');
  console.log('  GET    http://localhost:' + PORT + '/api/task/user/:userId (CON AUTH)');

  // Swagger
  console.log('  http://localhost:' + PORT + '/api-docs (Documentación Swagger)');
});
