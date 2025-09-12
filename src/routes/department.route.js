const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/department.controller');


router.post('/', DepartmentController.create);
router.get('/', DepartmentController.list);
router.get('/:id', DepartmentController.get);
router.put('/:id', DepartmentController.update);
router.delete('/:id', DepartmentController.remove);

module.exports = router;
