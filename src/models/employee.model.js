const db = require('../config/db');

const Employee = {
  async create({ name, departmentId, remark }) {
    const [result] = await db.execute(
      'INSERT INTO Employee (Name, DepartmentId, Remark) VALUES (?, ?, ?)',
      [name, departmentId || null, remark || null]
    );
    return result.insertId;
  },

  async findAll(search) {
    let sql = `SELECT e.Id, e.Name, e.DepartmentId, d.DepartmentName, e.Remark
       FROM Employee e
       LEFT JOIN Department d ON e.DepartmentId = d.Id`;
    const params = [];
    if (search) {
      sql += ' WHERE e.Name LIKE ? OR d.DepartmentName LIKE ?';
      params.push(`%${search}%`, `%${search}%`);
    }
    const [rows] = await db.execute(sql, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT e.Id, e.Name, e.DepartmentId, d.DepartmentName, e.Remark
       FROM Employee e
       LEFT JOIN Department d ON e.DepartmentId = d.Id
       WHERE e.Id = ?`,
      [id]
    );
    return rows[0];
  },

  async update(id, { name, departmentId, remark }) {
    await db.execute(
      'UPDATE Employee SET Name = ?, DepartmentId = ?, Remark = ? WHERE Id = ?',
      [name, departmentId || null, remark || null, id]
    );
    return this.findById(id);
  },

  async delete(id) {
  const [result] = await db.execute('DELETE FROM Employee WHERE Id = ?', [id]);
  // result.affectedRows === number of rows deleted; return true only if at least one row was removed
  return result && result.affectedRows > 0;
  }
};

module.exports = Employee;
