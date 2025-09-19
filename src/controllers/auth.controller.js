const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');

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
  }
};

module.exports = AuthController;


