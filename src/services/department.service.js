const Department = require('../models/department.model');

const DepartmentService = {
  create(data) {
    return Department.create(data.name);
  },

  list(search) {
    return Department.findAll(search);
  },

  get(id) {
    return Department.findById(id);
  },

  update(id, data) {
    return Department.update(id, data.name);
  },

  remove(id) {
    return Department.delete(id);
  }
};

module.exports = DepartmentService;
