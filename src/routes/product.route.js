const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

router.post('/', ProductController.create);
router.get('/', ProductController.list);
router.get('/:id', ProductController.get);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.remove);
router.post('/:id/restore', ProductController.restore);

module.exports = router;


