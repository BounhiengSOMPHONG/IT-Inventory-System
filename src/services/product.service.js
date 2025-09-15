const Product = require('../models/product.model');

const ProductService ={
    create(data){
        return Product.create(data);
    },
    list(query){
        return Product.findAll(query.search, query.status);
    },
    get(id){
        return Product.findById(id);
    },
    updateAndlog(id, newData, logData) {
    return Product.updateAndlog(id, newData, logData);
  },
};

module.exports = ProductService;