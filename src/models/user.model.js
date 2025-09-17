const db = require('../config/db');

const User = {
  async create({ username, password, image = null, role = 'User' }) {
    const [result] = await db.execute(
      'INSERT INTO User (Username, Password, Image, Role) VALUES (?, ?, ?, ?)',
      [username, password, image, role]
    );
    const id = result.insertId;
    const [rows] = await db.execute('SELECT Id, Username, Image, Role FROM User WHERE Id = ?', [id]);
    return rows[0];
  },

  async findByUsername(username) {
    const [rows] = await db.execute('SELECT * FROM User WHERE Username = ?', [username]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT Id, Username, Image, Role FROM User WHERE Id = ?', [id]);
    return rows[0];
  },

  async updatePassword(id, password) {
    await db.execute('UPDATE User SET Password = ? WHERE Id = ?', [password, id]);
    return this.findById(id);
  }
};

module.exports = User;


