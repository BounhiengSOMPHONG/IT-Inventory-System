const Employee = require('../models/employee.model');

const EmployeeService = {
  create(data) {
    return Employee.create(data);
  },

  list(search) {
    return Employee.findAll(search);
  },

  get(id) {
    return Employee.findById(id);
  },

  update(id, data) {
    return Employee.update(id, data);
  },

  remove(id) {
    return Employee.delete(id);
  }
};

module.exports = EmployeeService;
