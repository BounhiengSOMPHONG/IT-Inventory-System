const db = require("../config/db");

const Product = {
  async create(data) {
    const [result] = await db.execute(
      "INSERT INTO product (name,product_model,manufacturer,product_type_id,asset_code,serial_number,service_tag,hd,ram,cpu,status_id,added_by,year_bought) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [data.name,
        data.product_model,
        data.manufacturer,
        data.product_type_id,
        data.asset_code,
        data.serial_number,
        data.service_tag,
        data.hd || null,
        data.ram ||null,
        data.cpu ||null,
        data.status_id || 2,
        data.added_by,
        data.year_bought,
      ]
    );
    const id = result.insertId;
    const [rows] = await db.execute("SELECT * FROM product WHERE id = ?", [id]);
    return rows[0];
  },


  async findAll(search, status_id) {
    let sql = "SELECT * FROM product";
    const params = [];
    const whereClauses = [];

    if (status_id !== undefined) {
      whereClauses.push("status_id = ?");
      params.push(status_id);
    }

    if (search) {
      whereClauses.push("(name LIKE ? OR asset_code LIKE ? OR serial_number LIKE ?)");
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (whereClauses.length > 0) {
      sql += " WHERE " + whereClauses.join(" AND ");
    }

    const [rows] = await db.execute(sql, params);
    return rows;
  },
  async findById(id){
    const [rows] = await db.execute("SELECT * FROM product WHERE id = ?", [id]);
    return rows[0];
  }
};

module.exports = Product;
