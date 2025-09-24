const express = require('express');
const router = express.Router();
const DailySupportController = require('../controllers/dailysupport.controller');

router.post('/', DailySupportController.create);
router.get('/', DailySupportController.list);
router.get('/export', DailySupportController.exportToExcel);
router.get('/report', DailySupportController.exportReport);
router.get('/:id', DailySupportController.get);
router.put('/:id', DailySupportController.update);
router.delete('/:id', DailySupportController.remove);

module.exports = router;