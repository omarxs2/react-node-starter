const { body } = require('express-validator');
const { query } = require('express-validator');
const { param } = require('express-validator');

module.exports = {
  // POST /application
  create: [
    body('full_name', 'Full Name is required').exists(),
    body('email', 'Email  is required').exists(),
    body('phone', 'Phone  is required').exists(),
    body('father', 'Fathe is required').exists(),
    body('mother', 'Mother is required').exists(),
    body('passport_number', 'Passport number  is required').exists(),
    body('nationality', 'Nationality  is required').exists(),
    body('school_name', 'School Name is required').exists(),
    body('gpa', 'GPA  is required').exists(),
    body('graduation_year', 'Graduation year is required').exists(),
    body('address', 'Address is required').exists(),

    body('degree', 'Degree  is required').exists(),
    body('department', 'Department  is required').exists(),
    body('language', 'Language  is required').exists(),
    body('university', 'University  is required').exists(),

    body('transcript', 'Transcript is required').exists(),
    body('diploma', 'Diploma is required').exists(),
    body('passport', 'Passport is required').exists(),
    body('personal_image', 'Personal Image is required').exists(),

    body('agent_name', 'Agent is required').exists(),
    body('company', 'Company is required').exists(),


  ],
  // GET /application
  get: [
  ],
  // GET /application/:id
  getSingle: [
    param('id', 'ID is required').exists(),
  ],
  // GET /application
  checkEmail: [
    query('email', 'Email  is required').exists(),
  ],
  // PATCH /department
  update: [
    body('payment', 'Payment is required').optional(),
  ],
};

