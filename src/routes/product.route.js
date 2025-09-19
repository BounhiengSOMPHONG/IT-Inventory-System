const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.post('/', ProductController.create);
router.get('/', ProductController.list);
router.get('/deleted', authMiddleware, ProductController.getDeleted);
router.get('/edit-logs', ProductController.searchEditLogs);
router.get('/:id', ProductController.get);
router.get('/:id/edit-logs', ProductController.getEditLogs);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);
router.patch('/:id/restore', authMiddleware, ProductController.restore);

module.exports = router;