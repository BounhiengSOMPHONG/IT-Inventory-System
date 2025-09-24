const StatusService = require('../services/status.service');

const StatusController = {
  async create(req, res) {
    try {
      const id = await StatusService.create(req.body);
      res.json({ success: true, id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  },

  async list(req, res) {
    try {
      const rows = await StatusService.list();
      res.json({ success: true, data: rows });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  },

  async get(req, res) {
    try {
      const row = await StatusService.get(req.params.id);
      res.json({ success: true, data: row });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  },

  async update(req, res) {
    try {
      const affected = await StatusService.update(req.params.id, req.body);
      res.json({ success: true, affected });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  },

  async remove(req, res) {
    try {
      const affected = await StatusService.remove(req.params.id);
      res.json({ success: true, affected });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }
};

module.exports = StatusController;


