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
};

module.exports = Product;
