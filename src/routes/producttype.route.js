const express = require('express');
const router = express.Router();
const ProductTypeController = require('../controllers/producttype.controller');

router.post('/', ProductTypeController.create);
router.get('/', ProductTypeController.list);
router.get('/:id', ProductTypeController.get);
router.put('/:id', ProductTypeController.update);
router.delete('/:id', ProductTypeController.remove);

module.exports = router;