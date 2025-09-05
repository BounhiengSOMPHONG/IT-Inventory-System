const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

router.post('/', ProductController.create);
router.get('/', ProductController.list);
router.get('/:id', ProductController.get);

module.exports = router;