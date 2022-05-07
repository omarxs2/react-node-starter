const { body } = require('express-validator');

module.exports = {
  // POST /university
  create: [
    body('university_name_en', 'University EN is required').exists(),
    body('university_name_ar', 'University AR  is required').exists(),
    body('color', 'Color is required').exists(),
  ],
  // PATCH /university
  update: [
    body('university_name_en', 'University EN  is required').optional(),
    body('university_name_ar', 'University AR is required').optional(),
    body('color', 'Color is required').optional(),
  ],
};
