const DepartmentService = require('../services/department.service');

const DepartmentController = {
  async create(req, res) {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const dept = await DepartmentService.create({ name });
    res.status(201).json(dept);
  },

  async list(req, res) {
    const { search } = req.query;
    const depts = await DepartmentService.list(search);
    res.json(depts);
  },

  async get(req, res) {
    const id = req.params.id;
    const dept = await DepartmentService.get(id);
    if (!dept) return res.status(404).json({ message: 'Department not found' });
    res.json(dept);
  },

  async update(req, res) {
    const id = req.params.id;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const updated = await DepartmentService.update(id, { name });
    res.json(updated);
  },

  async remove(req, res) {
    const id = req.params.id;
    const deleted = await DepartmentService.remove(id);
    if (!deleted) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json({ message: 'Department deleted successfully',deleted });
  }
};

module.exports = DepartmentController;
