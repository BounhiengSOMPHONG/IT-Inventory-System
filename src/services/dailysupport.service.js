const DailySupport = require('../models/dailysupport.model');

const DailySupportService = {
  create(data) {
    return DailySupport.create(data);
  },

  list(search) {
    return DailySupport.findAll(search);
  },

  findById(id) {
    return DailySupport.findById(id);
  },

  update(id, data) {
    return DailySupport.update(id, data);
  },

  remove(id) {
    return DailySupport.delete(id);
  },
  
  getReportData(startDate, endDate) {
    return DailySupport.getReportData(startDate, endDate);
  }
};

module.exports = DailySupportService;