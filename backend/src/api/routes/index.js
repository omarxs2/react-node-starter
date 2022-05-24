const express = require('express');
const authenticate = require('../middlewares/authenticate');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const universityRoutes = require('./university.route');
const departmentRoutes = require('./department.route');
const priceRoutes = require('./price.route');
const fileRoutes = require('./file.route');
const applicationRoutes = require('./application.route');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', authenticate('admin'), userRoutes);
router.use('/university', universityRoutes);
router.use('/department', departmentRoutes);
router.use('/price', priceRoutes);
router.use('/application', applicationRoutes);
router.use('/file', fileRoutes);

module.exports = router;
