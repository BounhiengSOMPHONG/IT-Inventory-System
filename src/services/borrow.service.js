const Borrow = require('../models/borrow.model');

const BorrowService = {
  create(data) {
    return Borrow.create(data);
  },

  list(search) {
    return Borrow.findAll(search);
  },

  findById(id) {
    return Borrow.findById(id);
  },

  update(id, data) {
    return Borrow.update(id, data);
  },

  remove(id) {
    return Borrow.delete(id);
  },
  
  getBorrowingItems() {
    return Borrow.getBorrowingItems();
  }
};

module.exports = BorrowService;