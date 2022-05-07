const { body } = require('express-validator');

module.exports = {
  // POST /department
  create: [
    body('department_name_en', 'Department EN is required').exists(),
    body('department_name_ar', 'Department AR  is required').exists(),
    body('university', 'University  is required').exists(),
    body('language', 'Language  is required').exists(),
    body('years', 'Years is required').exists(),
    body('price_before', 'Price brfore  is required').exists(),
    body('price_after', 'Price after  is required').exists(),
  ],
  // PATCH /department
  update: [
    body('department_name_en', 'Department EN is required').optional(),
    body('department_name_ar', 'Department AR  is required').optional(),
    body('university', 'University  is required').optional(),
    body('language', 'Language  is required').optional(),
    body('years', 'Years is required').optional(),
    body('price_before', 'Price brfore  is required').optional(),
    body('price_after', 'Price after  is required').optional(),
  ],
};
