const pool = require('../config/db');

const Task = {
  async create(titulo, descripcion, fecha_vencimiento, id_usuario) {
    const [result] = await pool.query(
        "INSERT INTO tarea (titulo, descripcion, fecha_vencimiento, id_usuario) VALUES (?, ?, ?, ?)",
        [titulo, descripcion, fecha_vencimiento, id_usuario]
    );
    return result.insertId;
  },

  async findById(id) { 
    const [rows] = await pool.query(
        "SELECT * FROM tarea WHERE id_tarea = ?",
        [id]
    );
    return rows[0];
  },
    async findAllByUser(id_usuario) {
    const [rows] = await pool.query(
        "SELECT * FROM tarea WHERE id_usuario = ?",
        [id_usuario]
    );
    return rows;
  },

  async update(id, titulo, descripcion, fecha_vencimiento, estado) {  
    const [result] = await pool.query(
        "UPDATE tarea SET titulo = ?, descripcion = ?, fecha_vencimiento = ?, estado = ? WHERE id_tarea = ?",
        [titulo, descripcion, fecha_vencimiento,estado, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query(
        "DELETE FROM tarea WHERE id_tarea = ?",
        [id]
    );
    return result.affectedRows;
    },  

  async findAll() {
  const [rows] = await pool.query("SELECT * FROM tarea");
  return rows;
  },
};
      
module.exports = Task;