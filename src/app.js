const express = require("express");
const cors = require("cors");
const departmentRoutes = require('./routes/department.route');
const employeeRoutes = require('./routes/employee.route');
const productTypeRoutes = require('./routes/producttype.route');
const productRoutes = require('./routes/product.route');
const errorHandler = require('./middleware/error.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/producttypes', productTypeRoutes);
app.use('/api/products', productRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
