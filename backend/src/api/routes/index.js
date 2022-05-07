const express = require('express');
const authenticate = require('../middlewares/authenticate');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const universityRoutes = require('./university.route');
const departmentRoutes = require('./department.route');
const priceRoutes = require('./price.route');
const fileRoutes = require('./file.route');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', authenticate('admin'), userRoutes);
router.use('/university', authenticate('admin'), universityRoutes);
router.use('/department', authenticate('admin'), departmentRoutes);
router.use('/price', authenticate('admin'), priceRoutes);
router.use('/file', fileRoutes);

module.exports = router;
