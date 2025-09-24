const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

router.post('/', ProductController.create);
router.get('/', ProductController.list);
router.get('/report', ProductController.exportReport);
router.get('/change-report', adminMiddleware, ProductController.exportChangeReport);
router.get('/inactive', ProductController.getInactive);
router.get('/deleted', adminMiddleware, ProductController.getDeleted);
router.get('/edit-logs', adminMiddleware, ProductController.searchEditLogs);
router.get('/:id', ProductController.get);
router.get('/:id/edit-logs', adminMiddleware, ProductController.getEditLogs);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);
router.patch('/:id/restore', adminMiddleware, ProductController.restore);

module.exports = router;