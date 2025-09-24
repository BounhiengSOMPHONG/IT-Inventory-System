const db = require('../config/db');

const DailySupport = {
  async create({ date, requestBy, problem, reason, dateSolved, fixBy }) {
    const [result] = await db.execute(
      'INSERT INTO DailySupport (Date, RequestBy, Problem, Reason, DateSolved, FixBy) VALUES (?, ?, ?, ?, ?, ?)',
      [date, requestBy, problem, reason, dateSolved, fixBy]
    );
    const id = result.insertId;
    return this.findById(id);
  },

  async findAll(search) {
    let sql = `SELECT ds.Id, ds.Date, ds.RequestBy, e.Name AS RequestByName, ds.Problem, ds.Reason, ds.DateSolved, ds.FixBy, u.Username AS FixByName
               FROM DailySupport ds
               LEFT JOIN Employee e ON ds.RequestBy = e.Id
               LEFT JOIN User u ON ds.FixBy = u.Id`;
    const params = [];
    
    if (search) {
      sql += ' WHERE ds.Problem LIKE ? OR e.Name LIKE ? OR u.Username LIKE ?';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    sql += ' ORDER BY ds.Date DESC';
    
    const [rows] = await db.execute(sql, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT ds.Id, ds.Date, ds.RequestBy, e.Name AS RequestByName, ds.Problem, ds.Reason, ds.DateSolved, ds.FixBy, u.Username AS FixByName
       FROM DailySupport ds
       LEFT JOIN Employee e ON ds.RequestBy = e.Id
       LEFT JOIN User u ON ds.FixBy = u.Id
       WHERE ds.Id = ?`, [id]
    );
    return rows[0];
  },

  async update(id, { date, requestBy, problem, reason, dateSolved, fixBy }) {
    const fields = [];
    const params = [];

    if (date !== undefined) {
      fields.push('Date = ?');
      params.push(date);
    }
    if (requestBy !== undefined) {
      fields.push('RequestBy = ?');
      params.push(requestBy);
    }
    if (problem !== undefined) {
      fields.push('Problem = ?');
      params.push(problem);
    }
    if (reason !== undefined) {
      fields.push('Reason = ?');
      params.push(reason);
    }
    if (dateSolved !== undefined) {
      fields.push('DateSolved = ?');
      params.push(dateSolved);
    }
    if (fixBy !== undefined) {
      fields.push('FixBy = ?');
      params.push(fixBy);
    }

    if (fields.length > 0) {
      params.push(id);
      await db.execute(`UPDATE DailySupport SET ${fields.join(', ')} WHERE Id = ?`, params);
    }

    return this.findById(id);
  },

  async delete(id) {
    const [result] = await db.execute('DELETE FROM DailySupport WHERE Id = ?', [id]);
    return result && result.affectedRows > 0;
  },
  
  async getReportData(startDate, endDate) {
    const sql = `SELECT ds.Id, ds.Date, ds.RequestBy, e.Name AS RequestByName, ds.Problem, ds.Reason, ds.DateSolved, ds.FixBy, u.Username AS FixByName
                 FROM DailySupport ds
                 LEFT JOIN Employee e ON ds.RequestBy = e.Id
                 LEFT JOIN User u ON ds.FixBy = u.Id
                 WHERE ds.Date BETWEEN ? AND ?
                 ORDER BY ds.Date DESC`;
    
    const [rows] = await db.execute(sql, [startDate, endDate]);
    return rows;
  }
};

module.exports = DailySupport;