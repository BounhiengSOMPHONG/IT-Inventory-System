const db = require("../config/db");

const Product = {
  async create(data) {
    const [result] = await db.execute(
      "INSERT INTO Product (name,product_model,manufacturer,product_type_id,asset_code,serial_number,service_tag,hd,ram,cpu,status_id,added_by,year_bought) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.name,
        data.product_model,
        data.manufacturer,
        data.product_type_id,
        data.asset_code,
        data.serial_number,
        data.service_tag,
        data.hd || null,
        data.ram || null,
        data.cpu || null,
        data.status_id || 2,
        data.added_by,
        data.year_bought,
      ]
    );
    const id = result.insertId;
    const [rows] = await db.execute("SELECT * FROM Product WHERE id = ?", [id]);
    return rows[0];
  },

  async findAll(search, status_id) {
    let sql = "SELECT * FROM Product";
    const params = [];
    const whereClauses = [];

    if (status_id !== undefined) {
      whereClauses.push("status_id = ?");
      params.push(status_id);
    }

    if (search) {
      whereClauses.push(
        "(name LIKE ? OR asset_code LIKE ? OR serial_number LIKE ?)"
      );
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (whereClauses.length > 0) {
      sql += " WHERE " + whereClauses.join(" AND ");
    }

    const [rows] = await db.execute(sql, params);
    return rows;
  },
  async findById(id) {
    const [rows] = await db.execute("SELECT * FROM Product WHERE id = ?", [id]);
    return rows[0];
  },

  //update Product and edit_log
  async updateAndlog(id, newData, logData) {
    // 1. ดึงข้อมูลเก่ามา
    const [rows] = await db.query(
      `SELECT p.*, pt.name AS product_type_name 
         FROM Product p
         LEFT JOIN ProductType pt ON p.product_type_id = pt.id
         WHERE p.id = ?`,
      [id]
    );
    if (rows.length === 0) throw new Error("Product not found");
    const oldData = rows[0];
    // ตรวจสอบข้อมูลซ้ำ (asset_code, serial_number, service_tag) ที่ไม่ใช่ id นี้
    const [dupCheck] = await db.query(
      `SELECT id FROM Product 
       WHERE (asset_code = ? OR serial_number = ? OR service_tag = ?) 
       AND id != ?`,
      [newData.asset_code, newData.serial_number, newData.service_tag, id]
    );
    if (dupCheck.length > 0) {
      throw new Error("❌ Duplicate asset_code, serial_number, or service_tag");
    }
    // 2. อัพเดทข้อมูลใหม่
    await db.query(
      "UPDATE Product SET name=?, product_model=?, manufacturer=?, product_type_id=?, asset_code=?, serial_number=?, service_tag=?, hd=?, ram=?, cpu=?, status_id=?, year_bought=? WHERE id=? ",
      [
        newData.name,
        newData.product_model,
        newData.manufacturer,
        newData.product_type_id,
        newData.asset_code,
        newData.serial_number,
        newData.service_tag,
        newData.hd,
        newData.ram,
        newData.cpu,
        newData.status_id,
        newData.year_bought,
        id,
      ]
    );
    // 3. บันทึก log
    await db.query(
      "INSERT INTO ProductLogEdit (product_id, product_name, product_type, owner_id, asset_code, serial_number, service_tag, cpu, ram, hd, edit_by, action_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'UPDATE')",
      [
        id,
        oldData.name,
        // oldData.product_type_id, // หรือ join เอาชื่อ type
        oldData.product_type_name, // join เอาชื่อ type
        oldData.added_by, // owner_id
        oldData.asset_code,
        oldData.serial_number,
        oldData.service_tag,
        oldData.cpu,
        oldData.ram,
        oldData.hd,
        logData.edit_by, // user ที่แก้ไข
      ]
    );
  },
};

module.exports = Product;
