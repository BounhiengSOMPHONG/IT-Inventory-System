const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/service.controller');

router.post('/', ServiceController.create);
router.get('/', ServiceController.list);
router.get('/:id', ServiceController.get);
router.put('/:id', ServiceController.update);
router.delete('/:id', ServiceController.remove);

// assign and return endpoints
router.post('/assign', ServiceController.assign);
router.post('/return', ServiceController.returnToStock);

module.exports = router;


