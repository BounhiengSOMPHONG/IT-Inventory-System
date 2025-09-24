const ReplacedItem = require('../models/replaceditem.model');

const ReplacedItemService = {
  create(data) {
    return ReplacedItem.create(data);
  },

  list(search) {
    return ReplacedItem.findAll(search);
  },

  findById(id) {
    return ReplacedItem.findById(id);
  },

  update(id, data) {
    return ReplacedItem.update(id, data);
  },

  remove(id) {
    return ReplacedItem.delete(id);
  }
};

module.exports = ReplacedItemService;