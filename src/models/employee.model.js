const db = require('../config/db');

const Employee = {
  async create({ name, department_id, remark }) {
    const [result] = await db.execute(
      'INSERT INTO Employee (name, department_id, remark) VALUES (?, ?, ?)',
      [name, department_id || null, remark || null]
    );
    return { id: result.insertId, name, department_id, remark };
  },

  async findAll() {
    const [rows] = await db.execute(
      `SELECT e.id, e.name, e.department_id, d.name as department_name, e.remark
       FROM Employee e
       LEFT JOIN Department d ON e.department_id = d.id`
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT e.id, e.name, e.department_id, d.name as department_name, e.remark
       FROM Employee e
       LEFT JOIN Department d ON e.department_id = d.id
       WHERE e.id = ?`,
      [id]
    );
    return rows[0];
  },

  async update(id, { name, department_id, remark }) {
    await db.execute(
      'UPDATE Employee SET name = ?, department_id = ?, remark = ? WHERE id = ?',
      [name, department_id || null, remark || null, id]
    );
    return this.findById(id);
  },

  async delete(id) {
  const [result] = await db.execute('DELETE FROM Employee WHERE id = ?', [id]);
  // result.affectedRows === number of rows deleted; return true only if at least one row was removed
  return result && result.affectedRows > 0;
  }
};

module.exports = Employee;
