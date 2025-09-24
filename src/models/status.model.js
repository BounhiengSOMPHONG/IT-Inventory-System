const db = require('../config/db');

const Status = {
  async create(data) {
    const [result] = await db.execute('INSERT INTO Status (Name) VALUES (?)', [data.name]);
    return result.insertId;
  },

  async findAll() {
    const [rows] = await db.execute('SELECT * FROM Status ORDER BY Id ASC');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM Status WHERE Id = ?', [id]);
    return rows[0] || null;
  },

  async update(id, data) {
    const [result] = await db.execute('UPDATE Status SET Name = ? WHERE Id = ?', [data.name, id]);
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await db.execute('DELETE FROM Status WHERE Id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Status;


