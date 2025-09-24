const db = require('../config/db');

const Service = {
  async create(data) {
    const values = [
      data.employeeId || null,
      data.assetCode || null,
      data.date || new Date(),
      data.statusId || null,
      data.serviceBy || null,
      data.remark || null,
    ];
    const [result] = await db.execute(
      'INSERT INTO Service (EmployeeId, AssetCode, Date, StatusId, ServiceBy, Remark) VALUES (?, ?, ?, ?, ?, ?)',
      values
    );
    return result.insertId;
  },

  async findAll(filter) {
    const params = [];
    const where = [];
    if (filter && filter.statusId) {
      where.push('StatusId = ?');
      params.push(filter.statusId);
    }
    if (filter && filter.employeeId) {
      where.push('EmployeeId = ?');
      params.push(filter.employeeId);
    }
    const sql = `SELECT s.*, u.Username as ServiceByName, e.Name as EmployeeName FROM Service s LEFT JOIN User u ON s.ServiceBy = u.Id LEFT JOIN Employee e ON s.EmployeeId = e.Id ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY s.Date DESC`;
    const [rows] = await db.execute(sql, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM Service WHERE Id = ?', [id]);
    return rows[0] || null;
  },

  async update(id, data) {
    const fields = [];
    const params = [];
    if (data.employeeId !== undefined) {
      fields.push('EmployeeId = ?');
      params.push(data.employeeId);
    }
    if (data.assetCode !== undefined) {
      fields.push('AssetCode = ?');
      params.push(data.assetCode);
    }
    if (data.date !== undefined) {
      fields.push('Date = ?');
      params.push(data.date);
    }
    if (data.statusId !== undefined) {
      fields.push('StatusId = ?');
      params.push(data.statusId);
    }
    if (data.serviceBy !== undefined) {
      fields.push('ServiceBy = ?');
      params.push(data.serviceBy);
    }
    if (data.remark !== undefined) {
      fields.push('Remark = ?');
      params.push(data.remark);
    }
    if (fields.length === 0) return 0;
    params.push(id);
    const sql = `UPDATE Service SET ${fields.join(', ')} WHERE Id = ?`;
    const [result] = await db.execute(sql, params);
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await db.execute('DELETE FROM Service WHERE Id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Service;


