const express = require('express');
const router = express.Router();
const BorrowController = require('../controllers/borrow.controller');

router.post('/', BorrowController.create);
router.get('/', BorrowController.list);
router.get('/search', BorrowController.searchBorrows); // Dedicated search endpoint
router.get('/export', BorrowController.exportToExcel);
router.get('/borrowing', BorrowController.getBorrowingItems); // Items currently borrowed
router.get('/:id', BorrowController.get);
router.put('/:id', BorrowController.update);
router.delete('/:id', BorrowController.remove);

module.exports = router;