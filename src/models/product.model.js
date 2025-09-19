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
    // Exclude deleted products by default
    where.push("deleted = FALSE");
    
    // Only filter by status if it's explicitly provided and not null/undefined
    if (status !== undefined && status !== null && status !== '') {
      where.push("Status = ?");
      params.push(status);
    }
    if (search) {
      where.push("(ProductName LIKE ? OR ProductModel LIKE ? OR Manufacturer LIKE ? OR AssetCode LIKE ? OR SerialNumber LIKE ? OR ServiceTag LIKE ? OR YearBought LIKE ?)");
      const s = `%${search}%`;
      params.push(s, s, s, s, s, s, s);
    }
    const sql = `SELECT * FROM Product ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY id DESC`;
    const [rows] = await db.execute(sql, params);
    return rows;
  },
  async findById(id) {
    const [rows] = await db.execute("SELECT * FROM Product WHERE id = ? AND deleted = FALSE", [id]);
    return rows[0] || null;
  },
  async update(id, data, userId) {
    // Set the current user ID for logging
    await db.execute("SET @current_user_id = ?", [userId || null]);
    
    // Prevent accidentally clearing system information during PUT requests
    // Only update HD, RAM, CPU if they are explicitly provided and not empty/null
    const updateFields = [];
    const updateValues = [];
    
    // Always update these fields if provided
    if (data.productName !== undefined) {
      updateFields.push("ProductName = ?");
      updateValues.push(data.productName || null);
    }
    if (data.productModel !== undefined) {
      updateFields.push("ProductModel = ?");
      updateValues.push(data.productModel || null);
    }
    if (data.manufacturer !== undefined) {
      updateFields.push("Manufacturer = ?");
      updateValues.push(data.manufacturer || null);
    }
    if (data.productTypeId !== undefined) {
      updateFields.push("ProductTypeId = ?");
      updateValues.push(data.productTypeId || null);
    }
    if (data.assetCode !== undefined) {
      updateFields.push("AssetCode = ?");
      updateValues.push(data.assetCode || null);
    }
    if (data.serialNumber !== undefined) {
      updateFields.push("SerialNumber = ?");
      updateValues.push(data.serialNumber || null);
    }
    if (data.serviceTag !== undefined) {
      updateFields.push("ServiceTag = ?");
      updateValues.push(data.serviceTag || null);
    }
    if (data.status !== undefined) {
      updateFields.push("Status = ?");
      updateValues.push(data.status || null);
    }
    if (data.yearBought !== undefined) {
      updateFields.push("YearBought = ?");
      updateValues.push(data.yearBought || null);
    }
    
    // Only update system info if explicitly provided with actual values
    if (data.hd !== undefined && data.hd !== null && data.hd !== '') {
      updateFields.push("HD = ?");
      updateValues.push(data.hd);
    }
    if (data.ram !== undefined && data.ram !== null && data.ram !== '') {
      updateFields.push("RAM = ?");
      updateValues.push(data.ram);
    }
    if (data.cpu !== undefined && data.cpu !== null && data.cpu !== '') {
      updateFields.push("CPU = ?");
      updateValues.push(data.cpu);
    }
    
    // If no fields to update, return 0
    if (updateFields.length === 0) {
      return 0;
    }
    
    // Add ID for WHERE clause
    updateValues.push(id);
    
    const query = `UPDATE Product SET ${updateFields.join(', ')} WHERE Id = ?`;
    const [result] = await db.execute(query, updateValues);
    return result.affectedRows;
  },
  async delete(id, userId) {
    // Set the current user ID for logging
    await db.execute("SET @current_user_id = ?", [userId || null]);
    
    // Instead of deleting, mark as deleted (soft delete)
    const [result] = await db.execute("UPDATE Product SET deleted = TRUE WHERE Id = ?", [id]);
    return result.affectedRows;
  },
  async restore(id, userId) {
    // Set the current user ID for logging
    await db.execute("SET @current_user_id = ?", [userId || null]);
    
    // Restore a deleted product
    const [result] = await db.execute("UPDATE Product SET deleted = FALSE WHERE Id = ?", [id]);
    return result.affectedRows;
  },
  async findDeleted() {
    // Find all deleted products
    const [rows] = await db.execute("SELECT * FROM Product WHERE deleted = TRUE ORDER BY id DESC");
    return rows;
  },
  async getEditLogs(productId) {
    // Get all edit logs for a specific product
    const [rows] = await db.execute(
      `SELECT ple.*, u.Username as EditorName, e.Name as OwnerName 
       FROM ProductLogEdit ple 
       LEFT JOIN User u ON ple.EditBy = u.Id 
       LEFT JOIN Employee e ON ple.Owner = e.Id 
       WHERE ple.ProductId = ? 
       ORDER BY ple.DateTimeEdit DESC`,
      [productId]
    );
    return rows;
  },
  async searchEditLogs(search, productId) {
    // Search edit logs with optional product filter
    const params = [];
    const where = [];
    
    if (productId) {
      where.push("ple.ProductId = ?");
      params.push(productId);
    }
    
    if (search) {
      where.push("(ple.ProductName LIKE ? OR ple.AssetCode LIKE ? OR ple.SerialNumber LIKE ? OR ple.ServiceTag LIKE ?)");
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }
    
    const whereClause = where.length ? 'WHERE ' + where.join(' AND ') : '';
    const [rows] = await db.execute(
      `SELECT ple.*, u.Username as EditorName, e.Name as OwnerName 
       FROM ProductLogEdit ple 
       LEFT JOIN User u ON ple.EditBy = u.Id 
       LEFT JOIN Employee e ON ple.Owner = e.Id 
       ${whereClause}
       ORDER BY ple.DateTimeEdit DESC`,
      params
    );
    return rows;
  }
};

module.exports = Product;
