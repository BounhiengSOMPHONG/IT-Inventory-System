const db = require('../config/db');

const Department = {
  async create(name) {
    // database column is `department_name` in `department` table
  const [result] = await db.execute('INSERT INTO department (department_name) VALUES (?)', [name]);
  const id = result.insertId;
  const [rows] = await db.execute('SELECT id, department_name AS name, created_at FROM department WHERE id = ?', [id]);
  return rows[0];
  },

  async findAll(search) {
    let sql = 'SELECT id, department_name AS name FROM department';
    const params = [];
    if (search) {
      sql += ' WHERE department_name LIKE ?';
      params.push(`%${search}%`);
    }
    const [rows] = await db.execute(sql, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT id, department_name AS name FROM department WHERE id = ?', [id]);
    return rows[0];
  },

  async update(id, name) {
    await db.execute('UPDATE department SET department_name = ? WHERE id = ?', [name, id]);
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await db.execute('DELETE FROM department WHERE id = ?', [id]);
    return result && result.affectedRows > 0;
  }
};

module.exports = Department;
