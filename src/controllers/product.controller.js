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

  async list(req, res){
    const {search,status} = req.query;
    const q = {};
    if (search) q.search = search;
    if (typeof status !== 'undefined') q.status = Number(status);
    const prods = await ProductService.list(q);
    res.json(prods);
  },
  async get(req,res){
    const id = req.params.id;
    const prod = await ProductService.get(id);
    if (!prod) return res.status(404).json({message: 'Product not found'});
    res.json(prod);
  },
  async update(req,res){
   
  }
};

module.exports = ProductController;
