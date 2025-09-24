const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/change-password', authMiddleware, AuthController.changePassword);

module.exports = router;


