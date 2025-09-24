const ServiceService = require('../services/service.service');

const ServiceController = {
  async create(req, res) {
    try {
      const id = await ServiceService.create(req.body);
      res.status(201).json({ success: true, id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  },

  async list(req, res) {
    try {
      const filter = { statusId: req.query.statusId, employeeId: req.query.employeeId };
      const rows = await ServiceService.list(filter);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async get(req, res) {
    try {
      const row = await ServiceService.get(req.params.id);
      res.json(row);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async update(req, res) {
    try {
      const affected = await ServiceService.update(req.params.id, req.body);
      res.json({ success: true, affected });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async remove(req, res) {
    try {
      const affected = await ServiceService.remove(req.params.id);
      res.json({ success: true, affected });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async assign(req, res) {
    try {
      const { assetCode, employeeId, remark } = req.body;
      const serviceBy = req.user?.id || null;
      const result = await ServiceService.assignProductToEmployee({ assetCode, employeeId, serviceBy, remark });
      res.json({ success: true, result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async returnToStock(req, res) {
    try {
      const { assetCode, remark } = req.body;
      const serviceBy = req.user?.id || null;
      const result = await ServiceService.returnProductToStock({ assetCode, serviceBy, remark });
      res.json({ success: true, result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = ServiceController;


