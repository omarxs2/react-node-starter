const { body } = require('express-validator');

module.exports = {
  // POST /department
  create: [
    body('department_name_en', 'Department EN is required').exists(),
    body('department_name_ar', 'Department AR  is required').exists(),
  ],
  // PATCH /department
  update: [
    body('department_name_en', 'Department EN  is required').optional(),
    body('department_name_ar', 'Department AR is required').optional(),
  ],
};
