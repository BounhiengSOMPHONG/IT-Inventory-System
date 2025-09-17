const db = require("../config/db");

const Product = {
  async create(data) {
    const dateAdd = data.dateAdd || new Date();

    // Ensure all values are properly defined, replace undefined with null
    const values = [
      data.productName || null,
      data.productModel || null,
      data.manufacturer || null,
      data.productTypeId || null,
      data.assetCode || null,
      data.serialNumber || null,
      data.serviceTag || null,
      data.hd || null,
      data.ram || null,
      data.cpu || null,
      data.addedBy,
      data.yearBought || null,
      dateAdd,
    ];

    const [result] = await db.execute(
      "INSERT INTO Product (ProductName, ProductModel, Manufacturer, ProductTypeId, AssetCode, SerialNumber, ServiceTag, HD, RAM, CPU, AddedBy, YearBought, DateAdd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values
    );
    return result.insertId;
  },
  async getLastCode() {
    const [rows] = await db.execute(
      "SELECT AssetCode FROM Product ORDER BY id DESC LIMIT 1"
    );
    return rows.length > 0 ? rows[0].AssetCode : null;
  },
  async findAll(search, status) {
    const params = [];
    const where = [];
    if (typeof status !== 'undefined') {
      where.push("Status = ?");
      params.push(status);
    }
    if (search) {
      where.push("(ProductName LIKE ? OR ProductModel LIKE ? OR Manufacturer LIKE ? OR AssetCode LIKE ? OR SerialNumber LIKE ? OR ServiceTag LIKE ? OR HD LIKE ? OR RAM LIKE ? OR CPU LIKE ?)");
      const s = `%${search}%`;
      params.push(s, s, s, s, s, s, s, s, s);
    }
    const sql = `SELECT * FROM Product ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY id DESC`;
    const [rows] = await db.execute(sql, params);
    return rows;
  },
  async findById(id) {
    const [rows] = await db.execute("SELECT * FROM Product WHERE id = ?", [id]);
    return rows[0] || null;
  }
};

module.exports = Product;
