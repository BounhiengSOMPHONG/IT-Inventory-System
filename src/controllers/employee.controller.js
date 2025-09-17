const EmployeeService = require('../services/employee.service');

const EmployeeController = {
  async create(req, res) {
    const { name, departmentId, remark } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const emp = await EmployeeService.create({ name, departmentId, remark });
    res.status(201).json(emp);
  },

  async list(req, res) {
    const { search } = req.query;
    const emps = await EmployeeService.list(search);
    res.json(emps);
  },

  async get(req, res) {
    const id = req.params.id;
    const emp = await EmployeeService.get(id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  },

  async update(req, res) {
    const id = req.params.id;
    const { name, departmentId, remark } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const updated = await EmployeeService.update(id, { name, departmentId, remark });
    res.json(updated);
  },

  async remove(req, res) {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Employee id is required' });
  const deleted = await EmployeeService.remove(id);
  if (!deleted) return res.status(404).json({ message: 'Employee not found' });
  res.status(200).json({ message: 'Employee deleted successfully',data: deleted});
  }
};

module.exports = EmployeeController;
