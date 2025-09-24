const BorrowService = require('../services/borrow.service');
const xlsx = require('xlsx');

const BorrowController = {
  async create(req, res) {
    const { productName, date, remark, borrowBy, dateReturn, status, returnRemark } = req.body;
    if (!productName || !date || !borrowBy) return res.status(400).json({ message: 'Product name, date, and borrower are required' });
    
    try {
      const borrow = await BorrowService.create({ 
        productName, 
        date, 
        remark, 
        borrowBy, 
        dateReturn, 
        status: status || 'Borrowing', 
        returnRemark 
      });
      res.status(201).json(borrow);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create borrow record' });
    }
  },

  async list(req, res) {
    try {
      const { search } = req.query;
      const borrows = await BorrowService.list(search);
      res.json(borrows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch borrow records' });
    }
  },

  async searchBorrows(req, res) {
    try {
      const { q } = req.query; // Using 'q' as the search parameter name for search endpoint
      const borrows = await BorrowService.list(q);
      res.json(borrows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to search borrow records' });
    }
  },

  async get(req, res) {
    try {
      const id = req.params.id;
      const borrow = await BorrowService.findById(id);
      if (!borrow) return res.status(404).json({ message: 'Borrow record not found' });
      res.json(borrow);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch borrow record' });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { productName, date, remark, borrowBy, dateReturn, status, returnRemark } = req.body;
      const updated = await BorrowService.update(id, { 
        productName, 
        date, 
        remark, 
        borrowBy, 
        dateReturn, 
        status, 
        returnRemark 
      });
      if (!updated) return res.status(404).json({ message: 'Borrow record not found' });
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update borrow record' });
    }
  },

  async remove(req, res) {
    try {
      const id = req.params.id;
      const deleted = await BorrowService.remove(id);
      if (!deleted) return res.status(404).json({ message: 'Borrow record not found' });
      res.json({ message: 'Borrow record deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete borrow record' });
    }
  },

  async getBorrowingItems(req, res) {
    try {
      const borrowingItems = await BorrowService.getBorrowingItems();
      res.json(borrowingItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch borrowing items' });
    }
  },

  async exportToExcel(req, res) {
    try {
      const { search } = req.query;
      const borrows = await BorrowService.list(search);
      
      // Add report title to the data
      const excelData = [
        ['Borrow Report'],
        ['ID', 'Product Name', 'Borrow Date', 'Date Return', 'Status', 'Borrower', 'Department', 'Days Borrowed', 'Remark', 'Return Remark'],
        ...borrows.map(borrow => [
          borrow.Id,
          borrow.ProductName,
          borrow.Date,
          borrow.DateReturn || 'N/A',
          borrow.Status,
          borrow.BorrowerName || 'N/A',
          borrow.DepartmentName || 'N/A',
          borrow.DaysBorrowed || 0,
          borrow.Remark || 'N/A',
          borrow.ReturnRemark || 'N/A'
        ])
      ];
      
      // Create worksheet
      const ws = xlsx.utils.aoa_to_sheet(excelData);
      
      // Create a new workbook
      const wb = xlsx.utils.book_new();
      
      // Add worksheet to workbook
      xlsx.utils.book_append_sheet(wb, ws, 'Borrow Report');
      
      // Generate buffer
      const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
      
      // Set response headers for Excel file
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=borrow_report.xlsx');
      
      // Send the buffer
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to export to Excel' });
    }
  }
};

module.exports = BorrowController;