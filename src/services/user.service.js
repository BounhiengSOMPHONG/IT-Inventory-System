const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const UserService = {
  async create(data) {
    // Hash the password before creating the user
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(data.password, salt);
    return User.create({ 
      ...data, 
      password: password_hash 
    });
  },

  list() {
    return User.findAll();
  },

  findByUsername(username) {
    return User.findByUsername(username);
  },

  findById(id) {
    return User.findById(id);
  },

  async update(id, data) {
    // If password is being updated, hash it
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }
    return User.update(id, data);
  },

  remove(id) {
    return User.delete(id);
  }
};

module.exports = UserService;