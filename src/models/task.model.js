const pool = require('../config/db');

/**
 * Modelo de tareas para interactuar con la base de datos.
 * @namespace Task
 */
const Task = {
  /**
   * Crea una nueva tarea en la base de datos.
   * @param {string} titulo - Título de la tarea.
   * @param {string} descripcion - Descripción de la tarea.
   * @param {string} fecha_vencimiento - Fecha de vencimiento en formato 'YYYY-MM-DD'.
   * @param {number} id_usuario - ID del usuario al que pertenece la tarea.
   * @returns {Promise<number>} ID de la tarea creada.
   * @example
   * const tareaId = await Task.create("Comprar leche", "Ir al supermercado", "2025-09-15", 1);
   */
  async create(titulo, descripcion, fecha_vencimiento, id_usuario) {
    const [result] = await pool.query(
        "INSERT INTO tarea (titulo, descripcion, fecha_vencimiento, id_usuario) VALUES (?, ?, ?, ?)",
        [titulo, descripcion, fecha_vencimiento, id_usuario]
    );
    return result.insertId;
  },

  /**
   * Busca una tarea por su ID.
   * @param {number} id - ID de la tarea.
   * @returns {Promise<Object|null>} Objeto con los datos de la tarea o null si no existe.
   * @example
   * const tarea = await Task.findById(1);
   */
  async findById(id) { 
    const [rows] = await pool.query(
        "SELECT * FROM tarea WHERE id_tarea = ?",
        [id]
    );
    return rows[0];
  },

  /**
   * Obtiene todas las tareas de un usuario específico.
   * @param {number} id_usuario - ID del usuario.
   * @returns {Promise<Array<Object>>} Arreglo de objetos con las tareas del usuario.
   * @example
   * const tareas = await Task.findAllByUser(1);
   */
  async findAllByUser(id_usuario) {
    const [rows] = await pool.query(
        "SELECT * FROM tarea WHERE id_usuario = ?",
        [id_usuario]
    );
    return rows;
  },

  /**
   * Actualiza una tarea existente.
   * @param {number} id - ID de la tarea a actualizar.
   * @param {string} titulo - Nuevo título de la tarea.
   * @param {string} descripcion - Nueva descripción de la tarea.
   * @param {string} fecha_vencimiento - Nueva fecha de vencimiento en formato 'YYYY-MM-DD'.
   * @param {string} estado - Nuevo estado de la tarea (ej. "pendiente", "completada").
   * @returns {Promise<number>} Número de filas afectadas (0 si no se encontró la tarea).
   * @example
   * const filas = await Task.update(1, "Comprar leche", "Ir al supermercado", "2025-09-16", "pendiente");
   */
  async update(id, titulo, descripcion, fecha_vencimiento, estado) {  
    const [result] = await pool.query(
        "UPDATE tarea SET titulo = ?, descripcion = ?, fecha_vencimiento = ?, estado = ? WHERE id_tarea = ?",
        [titulo, descripcion, fecha_vencimiento, estado, id]
    );
    return result.affectedRows;
  },

  /**
   * Elimina una tarea por su ID.
   * @param {number} id - ID de la tarea a eliminar.
   * @returns {Promise<number>} Número de filas afectadas (0 si no se encontró la tarea).
   * @example
   * const filas = await Task.delete(1);
   */
  async delete(id) {
    const [result] = await pool.query(
        "DELETE FROM tarea WHERE id_tarea = ?",
        [id]
    );
    return result.affectedRows;
  },  

  /**
   * Obtiene todas las tareas registradas en la base de datos.
   * @returns {Promise<Array<Object>>} Arreglo de objetos con todas las tareas.
   * @example
   * const todasTareas = await Task.findAll();
   */
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM tarea");
    return rows;
  },
};
      
module.exports = Task;
