/* eslint-disable no-nested-ternary */
const _ = require('lodash');
const odooCaller = require('../services/odooCaller');
const customerError = require('../utils/customErrors/customerError');

exports.getCustomerCreationInfo = async (req, res, next) => {
  try {
    const { type } = req.query;
    const inParams = [
      '', // ids
      [['name', 'ilike', req.query.value]],
    ];
    let model;

    switch (type) {
      case 'state':
        model = 'x_customer_state';
        inParams[1][0][0] = 'x_name';
        break;
      case 'region':
        model = 'x_custom_city';
        inParams[1][0][0] = 'x_name';
        inParams[1].push(['x_parent_state', '=', req.query.id ? parseInt(req.query.id, 10) : false]);
        break;
      case 'city':
        model = 'x_customer_area';
        inParams[1][0][0] = 'x_name';
        inParams[1].push(['x_parent_id', '=', req.query.id ? parseInt(req.query.id, 10) : false]);
        break;
      case 'type':
        model = 'res.partner.category';
        break;
      case 'salesperson':
        model = 'res.users';
        break;
      case 'warehouse':
        model = 'stock.warehouse';
        break;
      case 'pricelist':
        model = 'product.pricelist';
        break;
      case 'categories':
        model = 'res.partner.category';
        break;
      default:
        model = undefined;
    }
    if (!model) throw customerError.TYPE_IS_INVALID;
    odooCaller(
      'name_search',
      model,
      res,
      [inParams, { limit: req.query.limit ? parseInt(req.query.limit, 10) : 8 }],
    );
  } catch (e) {
    next(e);
  }
  return true;
};

exports.create = async (req, res, next) => {
  try {
    const inParams = [
      _.pick(req.body, ['image', 'name', 'street', 'x_customer_state', 'x_customers_area', 'x_customer_city', 'category_id', 'warehouse_id', 'phone', 'mobile', 'email', 'user_id', 'property_product_pricelist', 'credit', 'partner_latitude', 'partner_longitude']),
    ];
    odooCaller(
      'create',
      'res.partner',
      res,
      [inParams],
    );
  } catch (e) {
    next(e);
  }
  return true;
};

exports.update = async (req, res, next) => {
  try {
    const inParams = [
      [parseInt(req.params.id, 10)], _.pick(req.body, ['image', 'name', 'street', 'x_customer_state', 'x_customers_area', 'x_customer_city', 'category_id', 'warehouse_id', 'phone', 'mobile', 'email', 'user_id', 'property_product_pricelist', 'credit', 'partner_latitude', 'partner_longitude']),
    ];
    odooCaller(
      'write',
      'res.partner',
      res,
      [inParams],
    );
  } catch (e) {
    next(e);
  }
  return true;
};
