const express = require('express');
const router = express.Router();
const AntivirusController = require('../controllers/antivirus.controller');

router.post('/', AntivirusController.create);
router.get('/', AntivirusController.list);
router.get('/export', AntivirusController.exportToExcel);
router.get('/:id', AntivirusController.get);
router.put('/:id', AntivirusController.update);
router.delete('/:id', AntivirusController.remove);

module.exports = router;