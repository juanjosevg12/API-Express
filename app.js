const express = require('express');
require('dotenv').config();

const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const tareaRoutes = require('./src/routes/task.routes');

const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/task', tareaRoutes);

module.exports = app;
