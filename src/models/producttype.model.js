const db = require('../config/db');

const ProductType = {
  async create(name) {
    const [result] = await db.execute('INSERT INTO ProductType (name) VALUES (?)', [name]);
    return { id: result.insertId, name };
  },
    async findAll() {
    const [rows] = await db.execute('SELECT id, name FROM ProductType');
    return rows;
  },
    async findById(id) {
    const [rows] = await db.execute('SELECT id, name FROM ProductType WHERE id = ?', [id]);
    return rows[0];
  },
    async update(id, name) {
    await db.execute('UPDATE ProductType SET name = ? WHERE id = ?', [name, id]);
    return this.findById(id);
  },
    async delete(id) {
    const [result] = await db.execute('DELETE FROM ProductType WHERE id = ?', [id]);
    return result && result.affectedRows > 0;
  },
}

module.exports = ProductType;