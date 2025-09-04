const db = require('../config/db');

const ProductType = {
  async create(name) {
  const [result] = await db.execute('INSERT INTO product_type (name) VALUES (?)', [name]);
  const id = result.insertId;
  const [rows] = await db.execute('SELECT id, name, created_at FROM product_type WHERE id = ?', [id]);
  return rows[0];
  },
  async findAll() {
  const [rows] = await db.execute('SELECT id, name, created_at FROM product_type');
    return rows;
  },
  async findById(id) {
  const [rows] = await db.execute('SELECT id, name, created_at FROM product_type WHERE id = ?', [id]);
    return rows[0];
  },
  async update(id, name) {
  await db.execute('UPDATE product_type SET name = ? WHERE id = ?', [name, id]);
    return this.findById(id);
  },
  async delete(id) {
  const [result] = await db.execute('DELETE FROM product_type WHERE id = ?', [id]);
    return result && result.affectedRows > 0;
  },
}

module.exports = ProductType;