const Antivirus = require('../models/antivirus.model');

const AntivirusService = {
  create(data) {
    return Antivirus.create(data);
  },

  list(search) {
    return Antivirus.findAll(search);
  },

  findById(id) {
    return Antivirus.findById(id);
  },

  update(id, data) {
    return Antivirus.update(id, data);
  },

  remove(id) {
    return Antivirus.delete(id);
  }
};

module.exports = AntivirusService;