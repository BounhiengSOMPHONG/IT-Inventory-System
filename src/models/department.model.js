const db = require('../config/db');

const Department = {
  async create(name) {
    const [result] = await db.execute('INSERT INTO Department (name) VALUES (?)', [name]);
    return { id: result.insertId, name };
  },

  async findAll() {
    const [rows] = await db.execute('SELECT id, name FROM Department');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT id, name FROM Department WHERE id = ?', [id]);
    return rows[0];
  },

  async update(id, name) {
    await db.execute('UPDATE Department SET name = ? WHERE id = ?', [name, id]);
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await db.execute('DELETE FROM Department WHERE id = ?', [id]);
    return result && result.affectedRows > 0;
  }
};

module.exports = Department;
