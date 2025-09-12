const User = require('../models/user.model');

const UserService = {
  create(data) {
    return User.create(data);
  },

  findByUsername(username) {
    return User.findByUsername(username);
  },

  findById(id) {
    return User.findById(id);
  },

  updatePassword(id, password) {
    return User.updatePassword(id, password);
  }
};

module.exports = UserService;


