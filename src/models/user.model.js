const db = require('../config/db');

const User = {
  async create({ username, password, image = null, role = 'User' }) {
    const [result] = await db.execute(
      'INSERT INTO User (username, password, image, role) VALUES (?, ?, ?, ?)',
      [username, password, image, role]
    );
    const id = result.insertId;
    const [rows] = await db.execute('SELECT id, username, image, role FROM User WHERE id = ?', [id]);
    return rows[0];
  },

  async findByUsername(username) {
    const [rows] = await db.execute('SELECT * FROM User WHERE username = ?', [username]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT id, username, image, role FROM User WHERE id = ?', [id]);
    return rows[0];
  },

  async updatePassword(id, password) {
    await db.execute('UPDATE User SET password = ? WHERE id = ?', [password, id]);
    return this.findById(id);
  }
};

module.exports = User;


