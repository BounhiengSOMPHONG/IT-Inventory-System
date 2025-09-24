const db = require('../config/db');

const Borrow = {
  async create({ productName, date, remark, borrowBy, dateReturn, status, returnRemark }) {
    const [result] = await db.execute(
      'INSERT INTO BorrowItem (ProductName, Date, Remark, BorrowBy, DateReturn, Status, ReturnRemark) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [productName, date, remark, borrowBy, dateReturn, status, returnRemark]
    );
    const id = result.insertId;
    return this.findById(id);
  },

  async findAll(search) {
    let sql = `SELECT bi.Id, bi.ProductName, bi.Date, bi.DateReturn, bi.Status, bi.Remark, bi.ReturnRemark, bi.BorrowBy, e.Name AS BorrowerName, d.DepartmentName, 
                      (CASE WHEN bi.DateReturn IS NULL THEN DATEDIFF(CURDATE(), bi.Date) ELSE DATEDIFF(bi.DateReturn, bi.Date) END) AS DaysBorrowed
               FROM BorrowItem bi
               LEFT JOIN Employee e ON bi.BorrowBy = e.Id
               LEFT JOIN Department d ON e.DepartmentId = d.Id`;
    const params = [];
    
    if (search) {
      sql += ' WHERE bi.ProductName LIKE ? OR e.Name LIKE ? OR d.DepartmentName LIKE ?';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    sql += ' ORDER BY bi.Date DESC';
    
    const [rows] = await db.execute(sql, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute(
      `SELECT bi.Id, bi.ProductName, bi.Date, bi.DateReturn, bi.Status, bi.Remark, bi.ReturnRemark, bi.BorrowBy, e.Name AS BorrowerName, d.DepartmentName,
               (CASE WHEN bi.DateReturn IS NULL THEN DATEDIFF(CURDATE(), bi.Date) ELSE DATEDIFF(bi.DateReturn, bi.Date) END) AS DaysBorrowed
       FROM BorrowItem bi
       LEFT JOIN Employee e ON bi.BorrowBy = e.Id
       LEFT JOIN Department d ON e.DepartmentId = d.Id
       WHERE bi.Id = ?`, [id]
    );
    return rows[0];
  },
  
  async getBorrowingItems() {
    const [rows] = await db.execute(
      `SELECT bi.Id, bi.ProductName, bi.Date, bi.DateReturn, bi.Status, bi.Remark, bi.ReturnRemark, bi.BorrowBy, e.Name AS BorrowerName, d.DepartmentName,
               (CASE WHEN bi.DateReturn IS NULL THEN DATEDIFF(CURDATE(), bi.Date) ELSE DATEDIFF(bi.DateReturn, bi.Date) END) AS DaysBorrowed
       FROM BorrowItem bi
       LEFT JOIN Employee e ON bi.BorrowBy = e.Id
       LEFT JOIN Department d ON e.DepartmentId = d.Id
       WHERE bi.Status = 'Borrowing'
       ORDER BY bi.Date DESC`
    );
    return rows;
  },

  async update(id, { productName, date, remark, borrowBy, dateReturn, status, returnRemark }) {
    const fields = [];
    const params = [];

    if (productName !== undefined) {
      fields.push('ProductName = ?');
      params.push(productName);
    }
    if (date !== undefined) {
      fields.push('Date = ?');
      params.push(date);
    }
    if (remark !== undefined) {
      fields.push('Remark = ?');
      params.push(remark);
    }
    if (borrowBy !== undefined) {
      fields.push('BorrowBy = ?');
      params.push(borrowBy);
    }
    if (dateReturn !== undefined) {
      fields.push('DateReturn = ?');
      params.push(dateReturn);
    }
    if (status !== undefined) {
      fields.push('Status = ?');
      params.push(status);
    }
    if (returnRemark !== undefined) {
      fields.push('ReturnRemark = ?');
      params.push(returnRemark);
    }

    if (fields.length > 0) {
      params.push(id);
      await db.execute(`UPDATE BorrowItem SET ${fields.join(', ')} WHERE Id = ?`, params);
    }

    return this.findById(id);
  },

  async delete(id) {
    const [result] = await db.execute('DELETE FROM BorrowItem WHERE Id = ?', [id]);
    return result && result.affectedRows > 0;
  }
};

module.exports = Borrow;