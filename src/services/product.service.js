const Product = require('../models/product.model');

const ProductService = {
  create(data) {
    return Product.create(data);
  },
  list(query) {
    return Product.findAll(query);
  },
  get(id) {
    return Product.findById(id);
  },
  update(id, data) {
    return Product.update(id, data);
  },
  remove(id) {
    return Product.softDelete(id);
  },
  restore(id) {
    return Product.restore(id);
  }
};

module.exports = ProductService;


