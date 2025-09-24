const db = require('../config/db');

const ReplacedItem = {
  async create({ productName, owner, date, replacedBy, remark }) {
    const [result] = await db.execute(
      'INSERT INTO ReplacedItem (ProductName, Owner, Date, ReplacedBy, Remark) VALUES (?, ?, ?, ?, ?)',
      [productName, owner, date, replacedBy, remark]
    );
    const id = result.insertId;
    return this.findById(id);
  },

  async findAll(search) {
    let sql = `SELECT ri.Id, ri.ProductName, ri.Owner, e.Name AS OwnerName, ri.Date, ri.ReplacedBy, u.Username AS ReplacedByName, ri.Remark
               FROM ReplacedItem ri
               LEFT JOIN Employee e ON ri.Owner = e.Id
               LEFT JOIN User u ON ri.ReplacedBy = u.Id`;
    const params = [];
    
    if (search) {
      sql += ' WHERE ri.ProductName LIKE ? OR e.Name LIKE ? OR u.Username LIKE ?';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    sql += ' ORDER BY ri.Date DESC';
    
    const [rows] = await db.execute(sql, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT ri.Id, ri.ProductName, ri.Owner, e.Name AS OwnerName, ri.Date, ri.ReplacedBy, u.Username AS ReplacedByName, ri.Remark
       FROM ReplacedItem ri
       LEFT JOIN Employee e ON ri.Owner = e.Id
       LEFT JOIN User u ON ri.ReplacedBy = u.Id
       WHERE ri.Id = ?`, [id]
    );
    return rows[0];
  },

  async update(id, { productName, owner, date, replacedBy, remark }) {
    const fields = [];
    const params = [];

    if (productName !== undefined) {
      fields.push('ProductName = ?');
      params.push(productName);
    }
    if (owner !== undefined) {
      fields.push('Owner = ?');
      params.push(owner);
    }
    if (date !== undefined) {
      fields.push('Date = ?');
      params.push(date);
    }
    if (replacedBy !== undefined) {
      fields.push('ReplacedBy = ?');
      params.push(replacedBy);
    }
    if (remark !== undefined) {
      fields.push('Remark = ?');
      params.push(remark);
    }

    if (fields.length > 0) {
      params.push(id);
      await db.execute(`UPDATE ReplacedItem SET ${fields.join(', ')} WHERE Id = ?`, params);
    }

    return this.findById(id);
  },

  async delete(id) {
    const [result] = await db.execute('DELETE FROM ReplacedItem WHERE Id = ?', [id]);
    return result && result.affectedRows > 0;
  }
};

module.exports = ReplacedItem;