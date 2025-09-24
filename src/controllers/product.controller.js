const ProductService = require("../services/product.service");


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
  }
};

module.exports = ProductController;