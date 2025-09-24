const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.post('/', UserController.create);
router.get('/', adminMiddleware, UserController.list);
router.get('/:id', authMiddleware, UserController.get);
router.put('/:id', authMiddleware, UserController.update);
router.delete('/:id', adminMiddleware, UserController.remove);

module.exports = router;