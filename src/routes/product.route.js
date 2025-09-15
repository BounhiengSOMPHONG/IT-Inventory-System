const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.post('/', ProductController.create);
router.get('/',authMiddleware, ProductController.list);
router.get('/:id', ProductController.get);
router.put('/:id', ProductController.update);

module.exports = router;