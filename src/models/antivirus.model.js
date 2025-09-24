const db = require('../config/db');

const Antivirus = {
  async create({ computerName, owner, assetCode, remark, status }) {
    const [result] = await db.execute(
      'INSERT INTO InstallAntiVirus (ComputerName, Owner, AssetCode, Remark, Status) VALUES (?, ?, ?, ?, ?)',
      [computerName, owner, assetCode, remark, status]
    );
    const id = result.insertId;
    return this.findById(id);
  },

  async findAll(search) {
    let sql = `SELECT iav.Id, iav.ComputerName, iav.Owner, e.Name AS OwnerName, iav.AssetCode, iav.Remark, iav.Status, iav.InstallDate
               FROM InstallAntiVirus iav
               LEFT JOIN Employee e ON iav.Owner = e.Id`;
    const params = [];
    
    if (search) {
      sql += ' WHERE iav.ComputerName LIKE ? OR e.Name LIKE ? OR iav.AssetCode LIKE ?';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    sql += ' ORDER BY iav.InstallDate DESC';
    
    const [rows] = await db.execute(sql, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT iav.Id, iav.ComputerName, iav.Owner, e.Name AS OwnerName, iav.AssetCode, iav.Remark, iav.Status, iav.InstallDate
       FROM InstallAntiVirus iav
       LEFT JOIN Employee e ON iav.Owner = e.Id
       WHERE iav.Id = ?`, [id]
    );
    return rows[0];
  },

  async update(id, { computerName, owner, assetCode, remark, status }) {
    const fields = [];
    const params = [];

    if (computerName !== undefined) {
      fields.push('ComputerName = ?');
      params.push(computerName);
    }
    if (owner !== undefined) {
      fields.push('Owner = ?');
      params.push(owner);
    }
    if (assetCode !== undefined) {
      fields.push('AssetCode = ?');
      params.push(assetCode);
    }
    if (remark !== undefined) {
      fields.push('Remark = ?');
      params.push(remark);
    }
    if (status !== undefined) {
      fields.push('Status = ?');
      params.push(status);
    }

    if (fields.length > 0) {
      params.push(id);
      await db.execute(`UPDATE InstallAntiVirus SET ${fields.join(', ')} WHERE Id = ?`, params);
    }

    return this.findById(id);
  },

  async delete(id) {
    const [result] = await db.execute('DELETE FROM InstallAntiVirus WHERE Id = ?', [id]);
    return result && result.affectedRows > 0;
  }
};

module.exports = Antivirus;