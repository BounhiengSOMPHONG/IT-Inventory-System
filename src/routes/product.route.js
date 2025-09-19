const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.post('/', ProductController.create);
router.get('/', ProductController.list);
router.get('/deleted', ProductController.getDeleted);
router.get('/:id', ProductController.get);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);
router.patch('/:id/restore', ProductController.restore);

module.exports = router;