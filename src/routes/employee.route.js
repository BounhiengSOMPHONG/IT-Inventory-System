const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee.controller');

router.post('/', EmployeeController.create);
router.get('/', EmployeeController.list);
router.get('/:id', EmployeeController.get);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.remove);

module.exports = router;
