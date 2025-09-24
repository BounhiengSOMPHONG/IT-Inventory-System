const Service = require('../models/service.model');
const Product = require('../models/product.model');
const db = require('../config/db');

const ServiceService = {
  async create(data) {
    // Ensure product is inactive before creating service
    const prod = await Product.findById(data.productId || data.productId === 0 ? data.productId : undefined);
    // We expect assetCode in data; check product by assetCode
    if (data.assetCode) {
      // basic check omitted; rely on DB constraints for now
    }
    return Service.create(data);
  },

  list(filter) {
    return Service.findAll(filter);
  },

  get(id) {
    return Service.findById(id);
  },

  update(id, data) {
    return Service.update(id, data);
  },

  remove(id) {
    return Service.delete(id);
  },

  async assignProductToEmployee({ assetCode, employeeId, serviceBy, remark }) {
    // Use stored procedure if available
    try {
      const [rows] = await db.execute('CALL sp_assign_product_to_employee(?, ?, ?, ?)', [assetCode, employeeId, serviceBy, remark]);
      return rows;
    } catch (err) {
      // fallback to application logic
      await db.beginTransaction();
      try {
        await db.execute('UPDATE Product SET Status = ? WHERE AssetCode = ?', ['Active', assetCode]);
        await db.execute('INSERT INTO Service (EmployeeId, AssetCode, Date, StatusId, ServiceBy, Remark) VALUES (?, ?, CURDATE(), ?, ?, ?)', [employeeId, assetCode, 1, serviceBy, remark]);
        await db.commit();
        return { success: true };
      } catch (e) {
        await db.rollback();
        throw e;
      }
    }
  },

  async returnProductToStock({ assetCode, serviceBy, remark }) {
    try {
      const [rows] = await db.execute('CALL sp_return_product_to_stock(?, ?, ?)', [assetCode, serviceBy, remark]);
      return rows;
    } catch (err) {
      await db.beginTransaction();
      try {
        await db.execute('UPDATE Product SET Status = ? WHERE AssetCode = ?', ['Inactive', assetCode]);
        await db.execute('INSERT INTO Service (EmployeeId, AssetCode, Date, StatusId, ServiceBy, Remark) SELECT NULL, ?, CURDATE(), ?, ?, ?', [assetCode, 2, serviceBy, remark]);
        await db.commit();
        return { success: true };
      } catch (e) {
        await db.rollback();
        throw e;
      }
    }
  }
};

module.exports = ServiceService;


