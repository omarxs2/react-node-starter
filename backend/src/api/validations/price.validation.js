const { body } = require('express-validator');

module.exports = {
  // POST /department
  create: [
    body('department_id', 'Department EN is required').exists(),
    body('university_id', 'University  is required').exists(),
    body('language', 'Language  is required').exists(),
    body('currency', 'Years is required').exists(),
    body('price_before', 'Price brfore  is required').exists(),
    body('price_after', 'Price after  is required').exists(),
    body('years', 'Years is required').exists(),
    body('degree', 'Department AR  is required').exists(),
  ],
  // PATCH /department
  update: [
    body('department_id', 'Department EN is required').optional(),
    body('university_id', 'University  is required').optional(),
    body('language', 'Language  is required').optional(),
    body('currency', 'Years is required').optional(),
    body('price_before', 'Price brfore  is required').optional(),
    body('price_after', 'Price after  is required').optional(),
  ],
};
