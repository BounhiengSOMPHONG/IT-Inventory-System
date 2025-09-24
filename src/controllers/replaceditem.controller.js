const ReplacedItemService = require('../services/replaceditem.service');
const xlsx = require('xlsx');

const ReplacedItemController = {
  async create(req, res) {
    const { productName, owner, date, replacedBy, remark } = req.body;
    if (!productName || !date) return res.status(400).json({ message: 'Product name and date are required' });
    
    try {
      const replacedItem = await ReplacedItemService.create({ 
        productName, 
        owner, 
        date, 
        replacedBy, 
        remark 
      });
      res.status(201).json(replacedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create replaced item record' });
    }
  },

  async list(req, res) {
    try {
      const { search } = req.query;
      const replacedItems = await ReplacedItemService.list(search);
      res.json(replacedItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch replaced item records' });
    }
  },

  async get(req, res) {
    try {
      const id = req.params.id;
      const replacedItem = await ReplacedItemService.findById(id);
      if (!replacedItem) return res.status(404).json({ message: 'Replaced item record not found' });
      res.json(replacedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch replaced item record' });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { productName, owner, date, replacedBy, remark } = req.body;
      const updated = await ReplacedItemService.update(id, { 
        productName, 
        owner, 
        date, 
        replacedBy, 
        remark 
      });
      if (!updated) return res.status(404).json({ message: 'Replaced item record not found' });
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update replaced item record' });
    }
  },

  async remove(req, res) {
    try {
      const id = req.params.id;
      const deleted = await ReplacedItemService.remove(id);
      if (!deleted) return res.status(404).json({ message: 'Replaced item record not found' });
      res.json({ message: 'Replaced item record deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete replaced item record' });
    }
  },

  async exportToExcel(req, res) {
    try {
      const { search } = req.query;
      const replacedItems = await ReplacedItemService.list(search);
      
      // Add report title to the data
      const excelData = [
        ['Replaced Items Report'],
        ['ID', 'Product Name', 'Owner', 'Date', 'Replaced By', 'Remark'],
        ...replacedItems.map(item => [
          item.Id,
          item.ProductName,
          item.OwnerName || 'N/A',
          item.Date,
          item.ReplacedByName || 'N/A',
          item.Remark || 'N/A'
        ])
      ];
      
      // Create worksheet
      const ws = xlsx.utils.aoa_to_sheet(excelData);
      
      // Create a new workbook
      const wb = xlsx.utils.book_new();
      
      // Add worksheet to workbook
      xlsx.utils.book_append_sheet(wb, ws, 'Replaced Items');
      
      // Generate buffer
      const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
      
      // Set response headers for Excel file
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=replaced_items.xlsx');
      
      // Send the buffer
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to export to Excel' });
    }
  }
};

module.exports = ReplacedItemController;