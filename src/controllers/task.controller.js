const Tarea = require("../models/task.model");
const bcrypt = require("bcryptjs");

/**
 * Obtiene todas las tareas registradas.
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía un arreglo con todas las tareas o un error HTTP 500.
 * @example
 * // GET /api/task
 */
async function getTareas(req, res) {
  try {
    const tareas = await Tarea.findAll();
    res.json(tareas);
  } catch (error) {
    console.error("Error en getTareas:", error);
    res.status(500).json({ message: "Error al obtener tareas", error: error.message });
  }
}

/**
 * Obtiene una tarea por su ID.
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía la tarea encontrada o un error HTTP 404/500.
 * @example
 * // GET /api/task/:id
 */
async function getTareaById(req, res) {
  try {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    return res.json(tarea);
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor" });
  }
}

/**
 * Obtiene todas las tareas del usuario autenticado.
 * @param {import('express').Request} req - Objeto de solicitud de Express (req.userId debe existir).
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía un arreglo con las tareas del usuario o un error HTTP 500.
 * @example
 * // GET /api/task/user
 */
async function getTareasByUser(req, res) {
  const id_usuario = req.userId;
  try {
    const tareas = await Tarea.findAllByUser(id_usuario);
    res.json(tareas);
  } catch (error) {
    console.error("Error en getTareasByUser:", error);
    res.status(500).json({ message: "Error al obtener tareas", error: error.message });
  }
}

/**
 * Crea una nueva tarea.
 * @param {import('express').Request} req - Objeto de solicitud de Express (req.userId debe existir).
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía mensaje de éxito con el ID de la tarea creada o un error HTTP 500.
 * @example
 * // POST /api/task
 * // body: { "titulo": "Comprar leche", "descripcion": "Ir al supermercado", "fecha_vencimiento": "2025-09-15" }
 */
async function createTarea(req, res) {
  const { titulo, descripcion, fecha_vencimiento } = req.body;
  const id_usuario = req.userId;
  try {  
    const nuevoId = await Tarea.create(
      titulo,
      descripcion,
      fecha_vencimiento,
      id_usuario
    );
    res.status(201).json({ message: "Tarea creada", id: nuevoId });
  } catch (error) {
    console.error("Error en createTarea:", error);
    res.status(500).json({ message: "Error al crear tarea", error: error.message });
  }
}

/**
 * Actualiza una tarea existente.
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía mensaje de éxito o errores HTTP 400/404/500.
 * @example
 * // PUT /api/task/:id
 * // body: { "titulo": "Nuevo título", "descripcion": "Nueva descripción", "fecha_vencimiento": "2025-09-20", "estado": "pendiente" }
 */
async function updateTarea(req, res) {
  const { titulo, descripcion, fecha_vencimiento, estado } = req.body;
  const { id } = req.params;
  try {
    const tarea = await Tarea.findById(id);
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    const affectedRows = await Tarea.update(
      id,
      titulo,
      descripcion,
      fecha_vencimiento,
      estado
    );
    if (affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar la tarea" });
    } else {
      res.json({ message: "Tarea actualizada" });
    }
  } catch (error) {
    console.error("Error en updateTarea:", error);
    res.status(500).json({ message: "Error al actualizar tarea", error: error.message });
  }
}

/**
 * Elimina una tarea por su ID.
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {void} Envía mensaje de éxito o errores HTTP 400/404/500.
 * @example
 * // DELETE /api/task/:id
 */
async function deleteTarea(req, res) {
  const { id } = req.params;
  try {
    const tarea = await Tarea.findById(id);
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    } else {
      const affectedRows = await Tarea.delete(id);
      if (affectedRows === 0) {
        return res.status(400).json({ message: "No se pudo eliminar la tarea" });
      } else {
        res.json({ message: "Tarea eliminada" });
      } 
    } 
  } catch (error) {
    console.error("Error en deleteTarea:", error);
    res.status(500).json({ message: "Error al eliminar tarea", error: error.message });
  }
}

module.exports = {
  getTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea,
  getTareasByUser
};
