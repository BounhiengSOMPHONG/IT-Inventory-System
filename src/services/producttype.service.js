const ProductType = require('../models/producttype.model');

const ProductTypeService = {
  create(data) {
    return ProductType.create(data.name);
  },
    list(search) {
        return ProductType.findAll(search);
    },
    get(id) {
        return ProductType.findById(id);
    },
    update(id, data) {
        return ProductType.update(id, data.name);
    },
    remove(id){
        return ProductType.delete(id);
    }
}

module.exports = ProductTypeService;