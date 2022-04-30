const express = require('express');
const authenticate = require('../middlewares/authenticate');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const roleRoutes = require('./role.route');
const orderRoutes = require('./order.route');
const customerRoutes = require('./customer.route');
const productRoutes = require('./product.route');
const segmentRoutes = require('./segment.route');

const router = express.Router();

// User routes
router.use('/auth', authRoutes);
router.use('/role', authenticate('user'), roleRoutes);
router.use('/order', authenticate('user'), orderRoutes);
router.use('/customer', authenticate('user'), customerRoutes);
router.use('/product', authenticate('user'), productRoutes);
router.use('/segment', authenticate('user'), segmentRoutes);

// Admin routes
router.use('/admin/user', authenticate('admin'), userRoutes);
router.use('/admin/role', authenticate('admin'), roleRoutes);

module.exports = router;
