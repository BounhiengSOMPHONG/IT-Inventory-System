const db = require('../config/db');

const ProductType = {
  async create(name) {
  const [result] = await db.execute('INSERT INTO ProductType (Name) VALUES (?)', [name]);
  const id = result.insertId;
  const [rows] = await db.execute('SELECT Id, Name FROM ProductType WHERE Id = ?', [id]);
  return rows[0];
  },
  async findAll(search) {
    let sql = 'SELECT Id, Name FROM ProductType';
    const params = [];
    if (search) {
      sql += ' WHERE Name LIKE ?';
      params.push(`%${search}%`);
    }
  const [rows] = await db.execute(sql, params);
    return rows;
  },
  async findById(id) {
  const [rows] = await db.execute('SELECT Id, Name FROM ProductType WHERE Id = ?', [id]);
    return rows[0];
  },
  async update(id, name) {
  await db.execute('UPDATE ProductType SET Name = ? WHERE Id = ?', [name, id]);
    return this.findById(id);
  },
  async delete(id) {
  const [result] = await db.execute('DELETE FROM ProductType WHERE Id = ?', [id]);
    return result && result.affectedRows > 0;
  },
}

module.exports = ProductType;