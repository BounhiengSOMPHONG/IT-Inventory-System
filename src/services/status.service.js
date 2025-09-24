const Status = require('../models/status.model');

const StatusService = {
  create(data) {
    return Status.create(data);
  },
  list() {
    return Status.findAll();
  },
  get(id) {
    return Status.findById(id);
  },
  update(id, data) {
    return Status.update(id, data);
  },
  remove(id) {
    return Status.delete(id);
  }
};

module.exports = StatusService;


