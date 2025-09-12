const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Endpoints para gestión de tareas
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tareas]
 *     responses:
 *       200:
 *         description: Lista de tareas
 */
router.get("/", tareaController.getTareas);

/**
 * @swagger
 * /api/task/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *       404:
 *         description: Tarea no encontrada
 */
router.get("/:id", tareaController.getTareaById);

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Comprar leche
 *               descripcion:
 *                 type: string
 *                 example: Ir a la tienda y comprar leche descremada
 *               userId:
 *                 type: string
 *                 example: 123
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 */
router.post("/", tareaController.createTarea);

/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     summary: Actualizar una tarea existente
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Comprar huevos
 *               descripcion:
 *                 type: string
 *                 example: Ir a la plaza y comprar una docena de huevos
 *               completada:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *       404:
 *         description: Tarea no encontrada
 */
router.put("/:id", tareaController.updateTarea);

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 */
router.delete("/:id", tareaController.deleteTarea);

/**
 * @swagger
 * /api/task/user/{userId}:
 *   get:
 *     summary: Obtener todas las tareas de un usuario específico
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de tareas del usuario
 */
router.get("/user/:userId", tareaController.getTareasByUser);

module.exports = router;
