const { body } = require('express-validator');

module.exports = {
  // POST /admin/user
  create: [
    body('email', 'Email is required').exists(),
    body('email', 'Invalid email').isEmail(),
    body('name', 'name is required').exists(),
    body('name', 'name must be at least 2 chars long').isLength({ min: 2 }),
    body('role', 'role is required').exists(),
    body('phone', 'role is required').exists(),
    body('country', 'role is required').exists(),
    body('company', 'role is required').exists(),
    body('logo', 'role is required').exists(),
    body('isActive', 'Status is required').exists(),
  ],
  // PATCH /admin/update
  update: [
    body('email', 'Invalid email').optional().isEmail(),
    body('name', 'name must be at least 2 chars long').optional().isLength({ min: 2 }),
    body('role', 'Last name must be at least 2 chars long').optional(),
    body('isActive', 'isActive must boolean').optional().isBoolean(),
    body('password', 'password must be a string').optional().isLength({ min: 6 }),
    body('phone', 'role is required').optional(),
    body('country', 'role is required').optional(),
    body('company', 'role is required').optional(),
    body('logo', 'role is required').optional(),
    body('isActive', 'Status is required').optional(),
  ],
};
