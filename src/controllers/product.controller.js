const ProductService = require("../services/product.service");
const xlsx = require('xlsx');

const ProductController = {
  async create(req, res) {
    const data = req.body;
    try {
      const Product = await ProductService.create(data);
      res.status(201).json({ message: "Product created", data: Product });
    } catch (error) {
       console.error(error);
      res.status(500).json({ error: "Create product failed" });
    }
  },

  async list(req, res) {
    try {
      const { search, status } = req.query;
      const query = {
        search,
        // Accept status as a friendly name (e.g. 'Using','Stock') or enum value 'Active'/'Inactive'
        status: status !== undefined && status !== '' && status !== null ? status : undefined,
      };
      const prods = await ProductService.list(query);
      res.json(prods);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  },

  async get(req, res) {
    try {
      const id = req.params.id;
      const prod = await ProductService.get(id);
      if (!prod) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(prod);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  },
  
  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      // Get user ID from the authenticated user (set by auth middleware)
      const userId = req.user?.id;
      const result = await ProductService.update(id, data, userId);
      if (result === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update product" });
    }
  },
  
  async delete(req, res) {
    try {
      const id = req.params.id;
      // Get user ID from the authenticated user (set by auth middleware)
      const userId = req.user?.id;
      const result = await ProductService.delete(id, userId);
      if (result === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  },
  
  async restore(req, res) {
    try {
      const id = req.params.id;
      // Get user ID from the authenticated user (set by auth middleware)
      const userId = req.user?.id;
      const result = await ProductService.restore(id, userId);
      if (result === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product restored successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to restore product" });
    }
  },
  
  async getDeleted(req, res) {
    try {
      const prods = await ProductService.getDeleted();
      res.json(prods);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch deleted products" });
    }
  },

  // Return products that are Inactive (for creating service records)
  async getInactive(req, res) {
    try {
      const prods = await ProductService.list({ search: null, status: 'Inactive' });
      res.json(prods);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch inactive products' });
    }
  },
  
  async getEditLogs(req, res) {
    try {
      const productId = req.params.id;
      const logs = await ProductService.getEditLogs(productId);
      res.json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch product edit logs" });
    }
  },
  
  async searchEditLogs(req, res) {
    try {
      const { search, productId } = req.query;
      const logs = await ProductService.searchEditLogs(search, productId);
      res.json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to search product edit logs" });
    }
  },
  
  async exportReport(req, res) {
    try {
      const { status } = req.query;
      const query = {
        search: null,
        status: status || undefined  // This will allow filtering by status (Active/Inactive)
      };
      
      const products = await ProductService.list(query);
      
      // Prepare report title
      let reportTitle = 'Product Report';
      if (status) {
        reportTitle = `Product Report - ${status}`;
      } else {
        reportTitle = 'All Products Report';
      }
      
      // Add report title and headers to the data
      const excelData = [
        [reportTitle],
        ['ID', 'Product Name', 'Product Model', 'Manufacturer', 'Product Type', 'Asset Code', 'Serial Number', 'Service Tag', 'HD', 'RAM', 'CPU', 'Status', 'Added By', 'Date Added', 'Year Bought'],
        ...products.map(product => [
          product.Id,
          product.ProductName,
          product.ProductModel || 'N/A',
          product.Manufacturer || 'N/A',
          product.ProductType || 'N/A',
          product.AssetCode || 'N/A',
          product.SerialNumber || 'N/A',
          product.ServiceTag || 'N/A',
          product.HD || 'N/A',
          product.RAM || 'N/A',
          product.CPU || 'N/A',
          product.Status,
          product.AddedByName || 'N/A',
          product.DateAdd,
          product.YearBought
        ])
      ];
      
      // Create worksheet
      const ws = xlsx.utils.aoa_to_sheet(excelData);
      
      // Create a new workbook
      const wb = xlsx.utils.book_new();
      
      // Add worksheet to workbook
      xlsx.utils.book_append_sheet(wb, ws, 'Products');
      
      // Generate buffer
      const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
      
      // Set response headers for Excel file
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=products_${status || 'all'}_report.xlsx`);
      
      // Send the buffer
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to export product report to Excel' });
    }
  },
  
  async exportChangeReport(req, res) {
    try {
      const { search, productId } = req.query;
      const logs = await ProductService.searchEditLogs(search, productId);
      
      // Add report title and headers to the data
      const excelData = [
        ['Product Change Report (Add, Delete, Edit)'],
        ['ID', 'Product ID', 'Product Name', 'Product Type', 'Owner', 'Asset Code', 'Serial Number', 'Service Tag', 'CPU', 'RAM', 'HD', 'Date Time Edit', 'Edit By'],
        ...logs.map(log => [
          log.Id,
          log.ProductId,
          log.ProductName,
          log.ProductType || 'N/A',
          log.OwnerName || 'N/A',
          log.AssetCode || 'N/A',
          log.SerialNumber || 'N/A',
          log.ServiceTag || 'N/A',
          log.CPU || 'N/A',
          log.RAM || 'N/A',
          log.HD || 'N/A',
          log.DateTimeEdit,
          log.EditByName || 'N/A'
        ])
      ];
      
      // Create worksheet
      const ws = xlsx.utils.aoa_to_sheet(excelData);
      
      // Create a new workbook
      const wb = xlsx.utils.book_new();
      
      // Add worksheet to workbook
      xlsx.utils.book_append_sheet(wb, ws, 'Product Changes');
      
      // Generate buffer
      const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
      
      // Set response headers for Excel file
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=product_changes_report.xlsx');
      
      // Send the buffer
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to export product change report to Excel' });
    }
  }
};

module.exports = ProductController;