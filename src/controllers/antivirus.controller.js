const AntivirusService = require('../services/antivirus.service');
const xlsx = require('xlsx');

const AntivirusController = {
  async create(req, res) {
    const { computerName, owner, assetCode, remark, status } = req.body;
    if (!computerName) return res.status(400).json({ message: 'Computer name is required' });
    
    try {
      const antivirus = await AntivirusService.create({ 
        computerName, 
        owner, 
        assetCode, 
        remark, 
        status: status || 'Pending' 
      });
      res.status(201).json(antivirus);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create antivirus record' });
    }
  },

  async list(req, res) {
    try {
      const { search } = req.query;
      const antiviruses = await AntivirusService.list(search);
      res.json(antiviruses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch antivirus records' });
    }
  },

  async get(req, res) {
    try {
      const id = req.params.id;
      const antivirus = await AntivirusService.findById(id);
      if (!antivirus) return res.status(404).json({ message: 'Antivirus record not found' });
      res.json(antivirus);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch antivirus record' });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { computerName, owner, assetCode, remark, status } = req.body;
      const updated = await AntivirusService.update(id, { 
        computerName, 
        owner, 
        assetCode, 
        remark, 
        status 
      });
      if (!updated) return res.status(404).json({ message: 'Antivirus record not found' });
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update antivirus record' });
    }
  },

  async remove(req, res) {
    try {
      const id = req.params.id;
      const deleted = await AntivirusService.remove(id);
      if (!deleted) return res.status(404).json({ message: 'Antivirus record not found' });
      res.json({ message: 'Antivirus record deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete antivirus record' });
    }
  },

  async exportToExcel(req, res) {
    try {
      const { search } = req.query;
      const antiviruses = await AntivirusService.list(search);
      
      // Add report title to the data
      const excelData = [
        ['Install Anti-Virus Report'],
        ['ID', 'Computer Name', 'Owner', 'Asset Code', 'Remark', 'Status', 'Install Date'],
        ...antiviruses.map(antivirus => [
          antivirus.Id,
          antivirus.ComputerName,
          antivirus.OwnerName || 'N/A',
          antivirus.AssetCode || 'N/A',
          antivirus.Remark || 'N/A',
          antivirus.Status,
          antivirus.InstallDate
        ])
      ];
      
      // Create worksheet
      const ws = xlsx.utils.aoa_to_sheet(excelData);
      
      // Create a new workbook
      const wb = xlsx.utils.book_new();
      
      // Add worksheet to workbook
      xlsx.utils.book_append_sheet(wb, ws, 'Install Anti-Virus');
      
      // Generate buffer
      const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
      
      // Set response headers for Excel file
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=install_antivirus.xlsx');
      
      // Send the buffer
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to export to Excel' });
    }
  }
};

module.exports = AntivirusController;