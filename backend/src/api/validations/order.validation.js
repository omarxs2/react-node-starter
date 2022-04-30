const { query, param, body } = require('express-validator');

module.exports = {
  // GET /order/lines
  getOrderLines: [
    query('ids', 'ids must be Integer').isString(),
  ],
  // GET /order/customer/:id
  getOrderCustomer: [
    param('customerId', 'customerId must be Integer').isNumeric(),
  ],
  // GET /order/info
  getOrderCreationInfo: [
    query('type', 'type is required').exists(),
    query('value', 'value  is required').exists(),
  ],
  // GET /order/productUom
  getProductDetails: [
    query('id', 'id is required').exists(),
    query('qty', 'qty  is required').exists(),
  ],
  // POST /order
  create: [
    body('partner_id', 'partner_id is required').exists(),
    body('partner_id', 'partner_id must be integer').isInt(),
    body('warehouse_id', 'warehouse_id is required').exists(),
    body('warehouse_id', 'warehouse_id must be integer').isInt(),
    body('pricelist_id', 'pricelist_id must be integer').optional().isInt(),
    body('payment_term_id', 'payment_term_id must be integer').optional().isInt(),
    body('user_id', 'user_id must be integer').optional().isInt(),
    body('team_id', 'team_id must be integer').optional().isInt(),
    body('order_line', 'partner_id must be array').optional().isArray(),
  ],
  // PUT /order/:id
  update: [
    param('id', 'id is required').exists(),
    param('id', 'id must be number').isNumeric(),
    body('partner_id', 'partner_id must be integer').optional().isInt(),
    body('warehouse_id', 'warehouse_id must be integer').optional().isInt(),
    body('pricelist_id', 'pricelist_id must be integer').optional().isInt(),
    body('payment_term_id', 'payment_term_id must be integer').optional().isInt(),
    body('user_id', 'user_id must be integer').optional().isInt(),
    body('team_id', 'team_id must be integer').optional().isInt(),
    body('order_line', 'partner_id must be array').optional().isArray(),
  ],
};
