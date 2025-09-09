const db = require('../config/db');

const Employee = {
  async create({ name, department_id, remark }) {
    const [result] = await db.execute(
      'INSERT INTO employee (name, department_id, remark) VALUES (?, ?, ?)',
      [name, department_id || null, remark || null]
    );
    const id = result.insertId;
    const [rows] = await db.execute(
      `SELECT e.id, e.name, e.department_id, d.name , e.remark
       FROM employee e
       LEFT JOIN department d ON e.department_id = d.id
       WHERE e.id = ?`,
      [id]
    );
    return rows[0];
  },

  async findAll(search) {
    let sql = `SELECT e.id, e.name, e.department_id, d.name , e.remark
       FROM employee e
       LEFT JOIN department d ON e.department_id = d.id`;
    const params = [];
    if (search) {
      sql += ' WHERE e.name LIKE ? OR d.name LIKE ?';
      params.push(`%${search}%`, `%${search}%`);
    }
    const [rows] = await db.execute(sql, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT e.id, e.name, e.department_id, d.name , e.remark
       FROM employee e
       LEFT JOIN department d ON e.department_id = d.id
       WHERE e.id = ?`,
      [id]
    );
    return rows[0];
  },

  async update(id, { name, department_id, remark }) {
    await db.execute(
      'UPDATE employee SET name = ?, department_id = ?, remark = ? WHERE id = ?',
      [name, department_id || null, remark || null, id]
    );
    return this.findById(id);
  },

  async delete(id) {
  const [result] = await db.execute('DELETE FROM employee WHERE id = ?', [id]);
  // result.affectedRows === number of rows deleted; return true only if at least one row was removed
  return result && result.affectedRows > 0;
  }
};

module.exports = Employee;
