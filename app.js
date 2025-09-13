const express = require('express');
require('dotenv').config();

const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const tareaRoutes = require('./src/routes/task.routes');
const setupSwagger = require('./swagger');

/**
 * Instancia principal de la aplicación Express.
 * @type {import('express').Express}
 */
const app = express();

// 🔹 Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

/**
 * 🔹 Rutas de autenticación
 * Todas las rutas relacionadas con registro, login y perfil de usuario
 */
app.use('/api/auth', authRoutes);

/**
 * 🔹 Rutas de usuarios
 * Endpoints para gestión de información de usuarios
 */
app.use('/api/user', userRoutes);

/**
 * 🔹 Rutas de tareas
 * Endpoints para gestión de tareas (CRUD)
 */
app.use('/api/task', tareaRoutes);

/**
 * Configuración de Swagger para documentación de la API
 * @param {import('express').Express} app - Instancia de la app Express donde se montará Swagger
 */
setupSwagger(app);

module.exports = app;
