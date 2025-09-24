const ServiceService = require('../services/service.service');
const xlsx = require('xlsx');

const ServiceController = {
  async create(req, res) {
    try {
      const id = await ServiceService.create(req.body);
      res.status(201).json({ success: true, id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  },

  async list(req, res) {
    try {
      const filter = { statusId: req.query.statusId, employeeId: req.query.employeeId };
      const rows = await ServiceService.list(filter);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async get(req, res) {
    try {
      const row = await ServiceService.get(req.params.id);
      res.json(row);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async update(req, res) {
    try {
      const affected = await ServiceService.update(req.params.id, req.body);
      res.json({ success: true, affected });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async remove(req, res) {
    try {
      const affected = await ServiceService.remove(req.params.id);
      res.json({ success: true, affected });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async assign(req, res) {
    try {
      const { assetCode, employeeId, remark } = req.body;
      const serviceBy = req.user?.id || null;
      const result = await ServiceService.assignProductToEmployee({ assetCode, employeeId, serviceBy, remark });
      res.json({ success: true, result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async returnToStock(req, res) {
    try {
      const { assetCode, remark } = req.body;
      const serviceBy = req.user?.id || null;
      const result = await ServiceService.returnProductToStock({ assetCode, serviceBy, remark });
      res.json({ success: true, result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },
  
  async exportReport(req, res) {
    try {
      const { statusId } = req.query;
      const filter = { statusId: statusId || null, employeeId: req.query.employeeId || null };
      
      const services = await ServiceService.list(filter);
      
      // Prepare report title based on status
      let reportTitle = 'Service Report';
      if (statusId) {
        // Get status name for the title
        const statusNames = {
          '1': 'Using',
          '2': 'Stock',
          '3': 'Broken',
          '4': 'Under Maintenance',
          '5': 'Disposed'
        };
        const statusName = statusNames[statusId] || `Status ${statusId}`;
        reportTitle = `Service Report - ${statusName}`;
      }
      
      // Add report title and headers to the data
      const excelData = [
        [reportTitle],
        ['ID', 'Employee Name', 'Asset Code', 'Date', 'Status', 'Service By', 'Remark'],
        ...services.map(service => [
          service.Id,
          service.EmployeeName || 'N/A',
          service.AssetCode || 'N/A',
          service.Date,
          service.StatusName || 'N/A',
          service.ServiceByName || 'N/A',
          service.Remark || 'N/A'
        ])
      ];
      
      // Create worksheet
      const ws = xlsx.utils.aoa_to_sheet(excelData);
      
      // Create a new workbook
      const wb = xlsx.utils.book_new();
      
      // Add worksheet to workbook
      xlsx.utils.book_append_sheet(wb, ws, 'Services');
      
      // Generate buffer
      const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
      
      // Set response headers for Excel file
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=services_${statusId ? 'status_' + statusId : 'all'}_report.xlsx`);
      
      // Send the buffer
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to export service report to Excel' });
    }
  },
  
  async exportChangeReport(req, res) {
    try {
      // This report will include all service records which represent "Add" changes
      // For "Delete" and "Edit", we would need a separate audit trail table
      // which doesn't exist in the current schema, so we'll report all current services
      const filter = {};
      const services = await ServiceService.list(filter);
      
      // Add report title and headers to the data
      const excelData = [
        ['Service Change Report (Add, Delete, Edit)'],
        ['ID', 'Employee Name', 'Asset Code', 'Date', 'Status', 'Service By', 'Remark'],
        ...services.map(service => [
          service.Id,
          service.EmployeeName || 'N/A',
          service.AssetCode || 'N/A',
          service.Date,
          service.StatusName || 'N/A',
          service.ServiceByName || 'N/A',
          service.Remark || 'N/A'
        ])
      ];
      
      // Create worksheet
      const ws = xlsx.utils.aoa_to_sheet(excelData);
      
      // Create a new workbook
      const wb = xlsx.utils.book_new();
      
      // Add worksheet to workbook
      xlsx.utils.book_append_sheet(wb, ws, 'Service Changes');
      
      // Generate buffer
      const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
      
      // Set response headers for Excel file
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=service_changes_report.xlsx');
      
      // Send the buffer
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to export service change report to Excel' });
    }
  }
};

module.exports = ServiceController;


