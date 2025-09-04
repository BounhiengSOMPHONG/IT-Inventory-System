const db = require('../config/db');

const Product = {
  async create(data) {
    const [result] = await db.execute(
      `INSERT INTO product (name, product_model, manufacturer, product_type_id, asset_code, serial_number, service_tag, hd, ram, cpu, status_id, added_by, year_bought)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.product_model || null,
        data.manufacturer || null,
        data.product_type_id || null,
        data.asset_code || null,
        data.serial_number || null,
        data.service_tag || null,
        data.hd || null,
        data.ram || null,
        data.cpu || null,
        data.status_id || 2,
        data.added_by || null,
        data.year_bought || null,
      ]
    );
    const id = result.insertId;
    const [rows] = await db.execute('SELECT * FROM product WHERE id = ?', [id]);
    return rows[0];
  },

  async findAll({ search, status_id } = {}) {
    let sql = 'SELECT * FROM product';
    const params = [];
    const where = [];
    if (typeof status_id !== 'undefined') {
      where.push('status_id = ?');
      params.push(status_id);
    }
    if (search) {
      where.push('(name LIKE ? OR asset_code LIKE ? OR serial_number LIKE ?)');
      const q = `%${search}%`;
      params.push(q, q, q);
    }
    if (where.length) sql += ' WHERE ' + where.join(' AND ');
    const [rows] = await db.execute(sql, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM product WHERE id = ?', [id]);
    return rows[0];
  },

  async update(id, data) {
    const fields = [];
    const params = [];
    const allowed = ['name','product_model','manufacturer','product_type_id','asset_code','serial_number','service_tag','hd','ram','cpu','status_id','added_by','year_bought'];
    allowed.forEach((k) => {
      if (typeof data[k] !== 'undefined') {
        fields.push(`${k} = ?`);
        params.push(data[k]);
      }
    });
    if (!fields.length) return this.findById(id);
    params.push(id);
    await db.execute(`UPDATE product SET ${fields.join(', ')} WHERE id = ?`, params);
    return this.findById(id);
  },

  async softDelete(id) {
    // we'll set status_id to 7 (Disposed) as a form of soft delete OR use status 2 (Inactive)
    const [result] = await db.execute('UPDATE product SET status_id = 2 WHERE id = ?', [id]);
    return result && result.affectedRows > 0;
  },

  async restore(id) {
    const [result] = await db.execute('UPDATE product SET status_id = 1 WHERE id = ?', [id]);
    return result && result.affectedRows > 0;
  }
};

module.exports = Product;


