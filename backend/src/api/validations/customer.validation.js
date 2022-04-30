const { query, body, param } = require('express-validator');

module.exports = {
  // GET /customer/info
  getCustomerCreationInfo: [
    query('type', 'type is required').exists(),
    query('value', 'value  is required').exists(),
  ],
  // POST /customer
  create: [
    body('name', 'name is required').exists(),
    body('name', 'name must be string').isString(),
    body('x_customer_state', 'x_customer_state is required').exists(),
    body('x_customer_state', 'x_customer_state must be integer').isInt(),
    body('x_customers_area', 'x_customers_area is required').exists(),
    body('x_customers_area', 'x_customers_area must be integer').isInt(),
    body('category_id', 'category_id is required').exists(),
    body('category_id', 'category_id must be array').isArray(),
    body('warehouse_id', 'warehouse_id is required').exists(),
    body('warehouse_id', 'warehouse_id must be integer').isInt(),
    body('mobile', 'mobile is required').exists(),
    body('partner_latitude', 'partner_latitude must be integer').optional().isFloat(),
    body('partner_longitude', 'partner_longitude must be integer').optional().isFloat(),
    body('street', 'street must be string').optional().isString(),
    body('property_product_pricelist', 'property_product_pricelist must be integer').optional().isInt(),
    body('user_id', 'user_id must be integer').optional().isInt(),
    body('email', 'email must be valid').optional().isEmail(),
  ],
  // PUT /customer/:id
  update: [
    param('id', 'id is required').exists(),
    param('id', 'id must be number').isNumeric(),
    body('name', 'name must be string').optional().isString(),
    body('x_customer_state', 'x_customer_state must be integer').optional().isInt(),
    body('x_customers_area', 'x_customers_area must be integer').optional().isInt(),
    body('category_id', 'category_id must be array').optional().isArray(),
    body('warehouse_id', 'warehouse_id must be integer').optional().isInt(),
    body('partner_latitude', 'partner_latitude must be integer').optional().isFloat(),
    body('partner_longitude', 'partner_longitude must be integer').optional().isFloat(),
    body('street', 'street must be string').optional().isString(),
    body('property_product_pricelist', 'property_product_pricelist must be integer').optional().isInt(),
    body('user_id', 'user_id must be integer').optional().isInt(),
    body('email', 'email must be valid').optional().isEmail(),
  ],
};
