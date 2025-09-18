const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.post('/', authMiddleware, ProductController.create);
router.get('/', ProductController.list);
router.get('/:id', ProductController.get);
router.put('/:id', authMiddleware, ProductController.update);
router.delete('/:id', authMiddleware, ProductController.delete);

module.exports = router;