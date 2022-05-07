const { body } = require('express-validator');

module.exports = {
  // POST /auth/register
  register: [
    body('email', 'Email is required').exists(),
    body('email', 'Invalid email').isEmail(),

    body('password', 'Password is required').exists(),
    body('password', 'Passwords must be at least 4 chars long').isLength({ min: 4 }),

    body('firstName', 'First name is required').exists(),
    body('firstName', 'First name must be at least 2 chars long').isLength({ min: 2 }),

    body('lastName', 'Last name is required').exists(),
    body('lastName', 'Last name must be at least 2 chars long').isLength({ min: 2 }),
  ],
  // POST /auth/login
  login: [
    body('email', 'Email is required').exists(),
    body('email', 'Invalid email').isEmail(),

    body('password', 'Password is required').exists(),
    body('password', 'Passwords must be at least 4 chars long').isLength({ min: 4 }),
  ],

  // POST /auth/forget
  forgetPassword: [
    body('email', 'Email is required').exists(),
    body('email', 'Invalid email').isEmail(),
  ],

  // POST /auth/reset-password
  resetPassword: [
    body('oldPassword', 'Old password is required').exists(),
    body('password', 'Password is required').exists(),
    body('password', 'Passwords must be at least 6 chars long').isLength({ min: 4 }),
  ],
};
