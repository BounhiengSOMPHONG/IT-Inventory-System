const db = require('../config/db');

const User = {
  async create({ username, password, image = null, role = 'User' }) {
    const [result] = await db.execute(
      'INSERT INTO User (Username, Password, Image, Role) VALUES (?, ?, ?, ?)',
      [username, password, image, role]
    );
    const id = result.insertId;
    return this.findById(id);
  },

  async findAll() {
    const [rows] = await db.execute('SELECT Id, Username, Image, Role, CreatedAt FROM User');
    return rows;
  },

  async findByUsername(username) {
    const [rows] = await db.execute('SELECT * FROM User WHERE Username = ?', [username]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT Id, Username, Image, Role, CreatedAt FROM User WHERE Id = ?', [id]);
    return rows[0];
  },

  async update(id, { username, image, role }) {
    const fields = [];
    const params = [];

    if (username) {
      fields.push('Username = ?');
      params.push(username);
    }
    if (image !== undefined) {
      fields.push('Image = ?');
      params.push(image);
    }
    if (role) {
      fields.push('Role = ?');
      params.push(role);
    }

    if (fields.length > 0) {
      fields.push('UpdatedAt = CURRENT_TIMESTAMP');
      params.push(id);
      await db.execute(`UPDATE User SET ${fields.join(', ')} WHERE Id = ?`, params);
    }

    return this.findById(id);
  },

  async updatePassword(id, password) {
    await db.execute('UPDATE User SET Password = ? WHERE Id = ?', [password, id]);
    return this.findById(id);
  },
  
  async delete(id) {
    const [result] = await db.execute('DELETE FROM User WHERE Id = ?', [id]);
    return result && result.affectedRows > 0;
  }
};

module.exports = User;


