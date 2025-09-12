const Tarea = require("../models/task.model");
const bcrypt = require("bcryptjs");

async function getTareas(req, res) {
    try {
    const tareas = await Tarea.findAll();
    res.json(tareas);
  } catch (error) {
    console.error("Error en getUsuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }

}

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

async function getTareasByUser (req, res) {
    const id_usuario = req.userId;
    try {
        const tareas = await Tarea.findAllByUser (id_usuario);
        res.json(tareas);
    } catch (error) {
        console.error("Error en getTareasByUser :", error);
        res.status(500).json({ message: "Error al obtener tareas", error: error.message });
    }
    }

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
                res.status(500).json({ message: "Error al eliminar tarea", error: error.message });}
}

module.exports = {
  getTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea,
  getTareasByUser
};
