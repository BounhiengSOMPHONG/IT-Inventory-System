const UserService = require('../services/user.service');

const UserController = {
  async create(req, res) {
    const { username, password, image, role } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });
    
    try {
      const existing = await UserService.findByUsername(username);
      if (existing) return res.status(409).json({ message: 'Username already exists' });
      
      const user = await UserService.create({ username, password, image, role });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  },

  async list(req, res) {
    try {
      const users = await UserService.list();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  async get(req, res) {
    try {
      const id = req.params.id;
      const user = await UserService.findById(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { username, image, role } = req.body;
      const updated = await UserService.update(id, { username, image, role });
      if (!updated) return res.status(404).json({ message: 'User not found' });
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  async remove(req, res) {
    try {
      const id = req.params.id;
      const deleted = await UserService.remove(id);
      if (!deleted) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
};

module.exports = UserController;