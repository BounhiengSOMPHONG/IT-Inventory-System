const db = require('../config/db');

const Department = {
  async create(name) {
    // database column is `name` in `Department` table
  const [result] = await db.execute('INSERT INTO Department (DepartmentName) VALUES (?)', [name]);
  const id = result.insertId;
  const [rows] = await db.execute('SELECT id, DepartmentName FROM Department WHERE id = ?', [id]);
  return rows.insertId;
  },

  async findAll(search) {
    let sql = 'SELECT id, DepartmentName FROM Department';
    const params = [];
    if (search) {
      sql += ' WHERE DepartmentName LIKE ?';
      params.push(`%${search}%`);
    }
    const [rows] = await db.execute(sql, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT id, DepartmentName FROM Department WHERE id = ?', [id]);
    return rows[0];
  },

  async update(id, name) {
    await db.execute('UPDATE Department SET DepartmentName = ? WHERE id = ?', [name, id]);
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await db.execute('DELETE FROM Department WHERE id = ?', [id]);
    return result && result.affectedRows > 0;
  }
};

module.exports = Department;
