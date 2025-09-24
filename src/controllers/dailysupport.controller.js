const DailySupportService = require('../services/dailysupport.service');
const xlsx = require('xlsx');

const DailySupportController = {
  async create(req, res) {
    const { date, requestBy, problem, reason, dateSolved, fixBy } = req.body;
    if (!date || !problem) return res.status(400).json({ message: 'Date and problem are required' });
    
    try {
      const dailySupport = await DailySupportService.create({ 
        date, 
        requestBy, 
        problem, 
        reason, 
        dateSolved, 
        fixBy 
      });
      res.status(201).json(dailySupport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create daily support record' });
    }
  },

  async list(req, res) {
    try {
      const { search } = req.query;
      const dailySupports = await DailySupportService.list(search);
      res.json(dailySupports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch daily support records' });
    }
  },

  async get(req, res) {
    try {
      const id = req.params.id;
      const dailySupport = await DailySupportService.findById(id);
      if (!dailySupport) return res.status(404).json({ message: 'Daily support record not found' });
      res.json(dailySupport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch daily support record' });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { date, requestBy, problem, reason, dateSolved, fixBy } = req.body;
      const updated = await DailySupportService.update(id, { 
        date, 
        requestBy, 
        problem, 
        reason, 
        dateSolved, 
        fixBy 
      });
      if (!updated) return res.status(404).json({ message: 'Daily support record not found' });
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update daily support record' });
    }
  },

  async remove(req, res) {
    try {
      const id = req.params.id;
      const deleted = await DailySupportService.remove(id);
      if (!deleted) return res.status(404).json({ message: 'Daily support record not found' });
      res.json({ message: 'Daily support record deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete daily support record' });
    }
  },

  async exportToExcel(req, res) {
    try {
      const { search } = req.query;
      const dailySupports = await DailySupportService.list(search);
      
      // Add report title to the data
      const excelData = [
        ['Daily Support Report'],
        ['ID', 'Date', 'Request By', 'Problem', 'Reason', 'Date Solved', 'Fix By'],
        ...dailySupports.map(support => [
          support.Id,
          support.Date,
          support.RequestByName || 'N/A',
          support.Problem,
          support.Reason || 'N/A',
          support.DateSolved || 'N/A',
          support.FixByName || 'N/A'
        ])
      ];
      
      // Create worksheet
      const ws = xlsx.utils.aoa_to_sheet(excelData);
      
      // Create a new workbook
      const wb = xlsx.utils.book_new();
      
      // Add worksheet to workbook
      xlsx.utils.book_append_sheet(wb, ws, 'Daily Support');
      
      // Generate buffer
      const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
      
      // Set response headers for Excel file
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=daily_support.xlsx');
      
      // Send the buffer
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to export to Excel' });
    }
  },
  
  async exportReport(req, res) {
    try {
      const { startDate, endDate, period } = req.query;
      
      // Validate date inputs
      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required for reports' });
      }
      
      // Validate that dates are valid
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
      
      // Get daily support records within date range
      const dailySupports = await DailySupportService.getReportData(startDate, endDate);
      
      // Prepare report data based on period
      let reportTitle = '';
      if (period === 'weekly') {
        reportTitle = `Weekly Daily Support Report (${startDate} to ${endDate})`;
      } else if (period === 'monthly') {
        reportTitle = `Monthly Daily Support Report (${startDate} to ${endDate})`;
      } else {
        reportTitle = `Daily Support Report (${startDate} to ${endDate})`;
      }
      
      // Add report title to the data
      const excelData = [
        [reportTitle],
        ['ID', 'Date', 'Request By', 'Problem', 'Reason', 'Date Solved', 'Fix By'],
        ...dailySupports.map(support => [
          support.Id,
          support.Date,
          support.RequestByName || 'N/A',
          support.Problem,
          support.Reason || 'N/A',
          support.DateSolved || 'N/A',
          support.FixByName || 'N/A'
        ])
      ];
      
      // Create worksheet
      const ws = xlsx.utils.aoa_to_sheet(excelData);
      
      // Create a new workbook
      const wb = xlsx.utils.book_new();
      
      // Add worksheet to workbook
      xlsx.utils.book_append_sheet(wb, ws, 'Daily Support Report');
      
      // Generate buffer
      const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
      
      // Set response headers for Excel file
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=daily_support_${period || 'report'}.xlsx`);
      
      // Send the buffer
      res.send(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to export report to Excel' });
    }
  }
};

module.exports = DailySupportController;