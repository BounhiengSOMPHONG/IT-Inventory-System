const db = require("../config/db");

const Product = {
  async create(data) {
    // Validate product type if provided
    const typeId = data.type_id || data.product_type_id || null;
    if (typeId !== null) {
      const [typeRows] = await db.query("SELECT id FROM ProductType WHERE id = ?", [typeId]);
      if (!typeRows || typeRows.length === 0) {
        const err = new Error("Invalid product_type id");
        err.code = "INVALID_PRODUCT_TYPE";
        throw err;
      }
    }

    // Ensure date_add is set to current date if missing
    const dateAdd = data.date_add || new Date();

    const [result] = await db.execute(
      "INSERT INTO Product (name, model, manufacturer, type_id, asset_code, serial_number, service_tag, hd, ram, cpu, added_by, year_bought, date_add) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.name,
        data.model || data.product_model,
        data.manufacturer,
        typeId,
        data.asset_code,
        data.serial_number,
        data.service_tag,
        data.hd || null,
        data.ram || null,
        data.cpu || null,
        data.added_by,
        data.year_bought,
        dateAdd,
      ]
    );
    const id = result.insertId;
    const [rows] = await db.execute("SELECT * FROM Product WHERE id = ?", [id]);
    return rows[0];
  },

  async findAll(search, status) {
    let sql = "SELECT * FROM Product";
    const params = [];
    const whereClauses = [];

    if (status !== undefined) {
      whereClauses.push("status = ?");
      params.push(status);
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

  async updateAndlog(id, newData, logData) {
    // 1. ดึงข้อมูลเก่ามา
    const [rows] = await db.query(
      `SELECT p.*, pt.name AS product_type_name 
         FROM Product p
         LEFT JOIN ProductType pt ON p.type_id = pt.id
         WHERE p.id = ?`,
      [id]
    );
    if (rows.length === 0) throw new Error("Product not found");
    const oldData = rows[0];

    // Normalize `product_type_id` to `type_id` so updates that send `product_type_id` work
    if (newData.product_type_id !== undefined && newData.type_id === undefined) {
      newData.type_id = newData.product_type_id;
    }

    // Validate provided type_id exists
    if (newData.type_id !== undefined && newData.type_id !== null) {
      const [typeRows] = await db.query("SELECT id FROM ProductType WHERE id = ?", [newData.type_id]);
      if (!typeRows || typeRows.length === 0) {
        const err = new Error("Invalid product_type id");
        err.code = "INVALID_PRODUCT_TYPE";
        throw err;
      }
    }
    // ตรวจสอบข้อมูลซ้ำ (asset_code, serial_number, service_tag) ที่ไม่ใช่ id นี้
    if (newData.asset_code || newData.serial_number || newData.service_tag) {
      const [dupCheck] = await db.query(
        `SELECT id FROM Product 
         WHERE (asset_code = ? OR serial_number = ? OR service_tag = ?) 
         AND id != ?`,
        [newData.asset_code, newData.serial_number, newData.service_tag, id]
      );
      if (dupCheck.length > 0) {
        throw new Error("❌ Duplicate asset_code, serial_number, or service_tag");
      }
    }

    // 2. อัพเดทข้อมูลใหม่ (แบบไดนามิก)
    const updateFields = [];
    const updateValues = [];
    const allowedFields = ['name', 'model', 'manufacturer', 'type_id', 'asset_code', 'serial_number', 'service_tag', 'hd', 'ram', 'cpu', 'status', 'year_bought'];

    allowedFields.forEach(field => {
      if (newData[field] !== undefined) {
        updateFields.push(`${field} = ?`);
        updateValues.push(newData[field]);
      }
    });

    if (updateFields.length > 0) {
      updateValues.push(id);
      await db.query(
        `UPDATE Product SET ${updateFields.join(', ')} WHERE id = ?`,
        updateValues
      );
    }

    // 3. บันทึก log
    await db.query(
      "INSERT INTO ProductLogEdit (product_id, product_name, product_type, owner, asset_code, serial_number, service_tag, cpu, ram, hd, edited_at, edited_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)",
      [
        id,
        oldData.name,
        oldData.product_type_name,
        oldData.added_by,
        oldData.asset_code,
        oldData.serial_number,
        oldData.service_tag,
        oldData.cpu,
        oldData.ram,
        oldData.hd,
        logData.edit_by,
      ]
    );
  },
};

module.exports = Product;
