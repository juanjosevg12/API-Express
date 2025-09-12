// index.js
const app = require('./app');
const PORT = process.env.PORT || 8080;

console.log('=== INICIANDO SERVIDOR ===');
console.log('Puerto:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log('Rutas disponibles:');
  console.log('  POST http://localhost:' + PORT + '/api/auth/register');
  console.log('  POST http://localhost:' + PORT + '/api/auth/login');
  console.log('  GET  http://localhost:' + PORT + '/api/user/test (SIN AUTH)');
  console.log('  GET  http://localhost:' + PORT + '/api/user (CON AUTH)');
});