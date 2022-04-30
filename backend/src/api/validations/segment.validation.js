const { body } = require('express-validator');

module.exports = {
  // POST /segment
  create: [
    body('name', 'name is required').exists(),
    body('name', 'name must be at least 2 chars long').isLength({ min: 2 }),

    body('ordersList', 'ordersList is required').exists(),
    body('ordersList', 'ordersList must be array').isArray(),

    body('driverId', 'driverId is required').exists(),
    body('driverId', 'driverId must be integer').isInt(),

    body('deliveryDate', 'Delivery date is required').exists(),

    body('driverName', 'driverName is required').exists(),
    body('driverName', 'driverName must be string').isString(),
  ],
  // PATCH /segment:id
  update: [
    body('name', 'name must be at least 2 chars long').optional().isLength({ min: 2 }),
    body('ordersList', 'ordersList must be at least 1 long').optional().isArray(),
    body('driverId', 'driverId must integer').optional().isInt(),
    body('driverName', 'driverName must string').optional().isString(),
  ],
};
