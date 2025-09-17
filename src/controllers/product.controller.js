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
        // Ensure status is a number if it exists, otherwise undefined.
        status: status !== undefined ? Number(status) : undefined,
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
  
  async update(req,res){
   
  }
};

module.exports = ProductController;