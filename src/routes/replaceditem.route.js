const express = require('express');
const router = express.Router();
const ReplacedItemController = require('../controllers/replaceditem.controller');

router.post('/', ReplacedItemController.create);
router.get('/', ReplacedItemController.list);
router.get('/export', ReplacedItemController.exportToExcel);
router.get('/:id', ReplacedItemController.get);
router.put('/:id', ReplacedItemController.update);
router.delete('/:id', ReplacedItemController.remove);

module.exports = router;