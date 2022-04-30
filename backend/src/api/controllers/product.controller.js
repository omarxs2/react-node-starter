/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
const odooCaller = require('../services/odooCaller');

exports.list = async (req, res, next) => {
  try {
    const fields = ['default_code', 'name', 'lst_price', 'price', 'qty_available', 'virtual_available', 'barcode', 'uom_id', 'product_tmpl_id'];
    const offset = (req.query.limit || 80) * (req.query.page - 1 || 0);
    const limit = (parseInt(req.query.limit, 10) || 80);

    const filters = [['sale_ok', '=', true]];
    const inParams = [
      filters,
      fields,
      offset,
      limit,
    ];
    odooCaller(
      'search_read',
      'product.product',
      res,
      [inParams],
    );
  } catch (e) {
    next(e);
  }
  return true;
};

exports.count = async (req, res, next) => {
  try {
    const inParams = [[['sale_ok', '=', true]]];
    odooCaller(
      'search_count',
      'product.product',
      res,
      [inParams],
    );
  } catch (e) {
    next(e);
  }
  return true;
};
