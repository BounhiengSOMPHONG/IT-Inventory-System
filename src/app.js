const express = require("express");
const cors = require("cors");
const departmentRoutes = require('./routes/department.route');
const employeeRoutes = require('./routes/employee.route');
const productTypeRoutes = require('./routes/producttype.route');
const ProductRoutes = require('./routes/product.route');
const statusRoutes = require('./routes/status.route');
const serviceRoutes = require('./routes/service.route');
const userRoutes = require('./routes/user.route');
const antivirusRoutes = require('./routes/antivirus.route');
const replacedItemRoutes = require('./routes/replaceditem.route');
const dailySupportRoutes = require('./routes/dailysupport.route');
const borrowRoutes = require('./routes/borrow.route');
const errorHandler = require('./middleware/error.middleware');
const authRoutes = require('./routes/auth.route');
const authMiddleware = require('./middleware/auth.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/producttypes', productTypeRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/statuses', statusRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/antivirus', antivirusRoutes);
app.use('/api/replaced-items', replacedItemRoutes);
app.use('/api/daily-support', dailySupportRoutes);
app.use('/api/borrow', borrowRoutes);
// Auth routes
app.use('/api/auth', authRoutes);

// Example protected route (optional):
// app.use('/api/secure', authMiddleware, secureRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
