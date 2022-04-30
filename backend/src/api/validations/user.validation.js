const { body } = require('express-validator');

module.exports = {
  // POST /admin/user
  create: [
    body('email', 'Email is required').exists(),
    body('email', 'Invalid email').isEmail(),

    body('name', 'name is required').exists(),
    body('name', 'name must be at least 2 chars long').isLength({ min: 2 }),

    body('roleId', 'roleId is required').exists(),
    body('roleId', 'roleId must be integer').isInt(),
  ],
  // PATCH /admin/update
  update: [
    body('email', 'Invalid email').optional().isEmail(),
    body('name', 'name must be at least 2 chars long').optional().isLength({ min: 2 }),
    body('roleId', 'Last name must be at least 2 chars long').optional().isInt(),
    body('isActive', 'isActive must boolean').optional().isBoolean(),
    body('password', 'password must be a string').optional().isLength({ min: 6 }),
  ],
};
