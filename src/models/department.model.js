const db = require('../config/db');

const Department = {
  async create(name) {
    // database column is `name` in `department` table
  const [result] = await db.execute('INSERT INTO department (name) VALUES (?)', [name]);
  const id = result.insertId;
  const [rows] = await db.execute('SELECT id, name FROM department WHERE id = ?', [id]);
  return rows[0];
  },

  async findAll(search) {
    let sql = 'SELECT id, name FROM department';
    const params = [];
    if (search) {
      sql += ' WHERE name LIKE ?';
      params.push(`%${search}%`);
    }
    const [rows] = await db.execute(sql, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT id, name FROM department WHERE id = ?', [id]);
    return rows[0];
  },

  async update(id, name) {
    await db.execute('UPDATE department SET name = ? WHERE id = ?', [name, id]);
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await db.execute('DELETE FROM department WHERE id = ?', [id]);
    return result && result.affectedRows > 0;
  }
};

module.exports = Department;
