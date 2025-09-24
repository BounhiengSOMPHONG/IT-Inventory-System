const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const authMiddleware = require('../middleware/auth.middleware');

const AuthController = {
  async register(req, res) {
    const { username, password, image, role } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Missing fields' });
    const existing = await UserService.findByUsername(username);
    if (existing) return res.status(409).json({ message: 'Username already registered' });
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const user = await UserService.create({ username, password: password_hash, image, role });
    res.status(201).json(user);
  },

  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await UserService.findByUsername(username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const stored = user.Password;
    let valid = false;
    // If password looks like bcrypt hash, compare with bcrypt; otherwise allow legacy plain-text match and re-hash
    if (stored && stored.startsWith('$2')) {
      valid = await bcrypt.compare(password, stored);
    } else {
      valid = password === stored;
      if (valid) {
        const salt = await bcrypt.genSalt(10);
        const newHash = await bcrypt.hash(password, salt);
        await UserService.updatePassword(user.Id, newHash);
      }
    }

    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ sub: user.Id, username: user.Username, role: user.Role }, process.env.JWT_SECRET || 'change-me', { expiresIn: '7d' });
    res.json({ token, user: { id: user.Id, username: user.Username, role: user.Role, image: user.Image } });
  },
  
  async changePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ message: 'Current password and new password are required' });
    
    try {
      // Get user from the authenticated request
      const userId = req.user.id;
      const user = await UserService.findById(userId);
      
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      // Verify current password
      const valid = await bcrypt.compare(currentPassword, user.Password);
      if (!valid) return res.status(401).json({ message: 'Current password is incorrect' });
      
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const newPasswordHash = await bcrypt.hash(newPassword, salt);
      
      // Update password
      await UserService.updatePassword(userId, newPasswordHash);
      
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update password' });
    }
  }
};

module.exports = AuthController;


