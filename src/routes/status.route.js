const express = require('express');
const router = express.Router();
const StatusController = require('../controllers/status.controller');

router.post('/', StatusController.create);
router.get('/', StatusController.list);
router.get('/:id', StatusController.get);
router.put('/:id', StatusController.update);
router.delete('/:id', StatusController.remove);

module.exports = router;


