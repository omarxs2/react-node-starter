/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
const _ = require('lodash');
const odooCaller = require('../services/odooCaller');
const orderError = require('../utils/customErrors/orderError');

exports.list = async (req, res, next) => {
  try {
    let fields;
    const { groupBy } = req.query;
    if (!groupBy) fields = ['id', 'name', 'partner_id', 'create_uid', 'amount_total', 'invoice_count', 'state', 'warehouse_id', 'payment_term_id', 'order_line', 'date_order', 'user_id', 'team_id', 'pricelist_id', 'driver_id'];
    else fields = groupBy.split(',');

    const offset = (req.query.limit || 20) * (req.query.page - 1 || 0);
    const limit = (parseInt(req.query.limit, 10) || 20);

    let filters = [];

    const from = req.query.from || '';
    const to = req.query.to || '';
    const statusArray = req.query.status && req.query.status.split(',');

    if (statusArray && statusArray.length > 0) {
      for (let i = 1; i < statusArray.length; i++) {
        filters.push('|');
      }
      statusArray.forEach((s) => {
        filters.push(['state',
          s === '2' ? 'in' : '=',
          s === '2' ? ['sale', 'done']
            : s === '0' ? 'draft'
              : s === '1' ? 'sent'
                : 'cancel']);
      });
    }

    if (from.length > 0) {
      filters.push(['confirmation_date', '>=', from]);
    }
    if (to.length > 0) {
      filters.push(['confirmation_date', '<=', to]);
    }

    if (req.body.filters) filters = filters.concat(req.body.filters);
    const inParams = [
      filters,
      fields,
      offset,
      limit,
    ];
    if (groupBy.length > 0)
      inParams.splice(
        2, 0, fields,
      );
    if (groupBy.length > 0) {
      odooCaller(
        'read_group',
        'sale.order',
        res,
        [inParams],
      );
    } else {
      odooCaller(
        'search_read',
        'sale.order',
        res,
        [inParams],
      );
    }
  } catch (e) {
    next(e);
  }
  return true;
};
exports.create = async (req, res, next) => {
  try {
    const inParams = [
      _.pick(req.body, ['partner_id', 'warehouse_id', 'pricelist_id', 'payment_term_id', 'user_id', 'team_id', 'order_line']),
    ];
    odooCaller(
      'create',
      'sale.order',
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
      [parseInt(req.params.id, 10)], _.pick(req.body, ['partner_id', 'warehouse_id', 'pricelist_id', 'payment_term_id', 'user_id', 'team_id', 'order_line']),
    ];

    if (req.query.status) {
      odooCaller(
        req.query.status,
        'sale.order',
        res,
        [inParams],
      );
    } else {
      odooCaller(
        'write',
        'sale.order',
        res,
        [inParams],
      );
    }
  } catch (e) {
    next(e);
  }
  return true;
};
exports.getOrderCreationInfo = async (req, res, next) => {
  try {
    const { type } = req.query;
    const inParams = [
      '', // ids
      [['name', 'ilike', req.query.value]],
    ];
    let model;

    switch (type) {
      case 'customer':
        model = 'res.partner';
        inParams[1].push(['customer', '=', true]);
        break;
      case 'warehouse':
        model = 'stock.warehouse';
        break;
      case 'pricelist':
        model = 'product.pricelist';
        break;
      case 'product':
        model = 'product.product';
        break;
      case 'salesperson':
        model = 'res.users';
        break;
      case 'saleschannel':
        model = 'crm.team';
        break;
      case 'payments':
        model = 'account.payment.term';
        break;
      case 'uom':
        model = 'product.uom';
        break;
      default:
        model = undefined;
    }
    if (!model) throw orderError.TYPE_IS_INVALID;
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

exports.getProductDetails = async (req, res, next) => {
  try {
    const {
      id, qty, partnerId, pricelistId,
    } = req.query;
    const inParams = [
      [],
      {
        product_uom_qty: qty,
        product_id: parseInt(id, 10),
        order_id: {
          partner_id: partnerId ? parseInt(partnerId, 10) : 17156,
          pricelist_id: pricelistId ? parseInt(pricelistId, 10) : 3,
        },
      },
      'product_id',
      {
        product_id: '1',
        product_uom: '1',
        price_unit: '1',
      },
    ];

    odooCaller(
      'onchange',
      'sale.order.line',
      res,
      [inParams],
    );
  } catch (e) {
    next(e);
  }
  return true;
};

exports.getOrderLines = async (req, res, next) => {
  try {
    const fields = ['product_id', 'product_uom_qty', 'price_unit', 'product_uom', 'discount'];

    const inParams = [
      req.query.ids.split(',').map((item) => parseInt(item, 10)),
      fields,
    ];
    odooCaller(
      'read',
      'sale.order.line',
      res,
      [inParams],
    );
  } catch (e) {
    next(e);
  }
  return true;
};
exports.getOrderCustomer = async (req, res, next) => {
  try {
    const fields = ['image_small', 'name', 'street', 'x_customer_state', 'x_customers_area', 'x_customer_city', 'category_id', 'warehouse_id', 'wr_seq', 'phone', 'mobile', 'email', 'user_id', 'property_product_pricelist', 'credit', 'partner_latitude', 'partner_longitude'];
    const inParams = [
      [parseInt(req.params.customerId, 10)],
      fields,
    ];
    odooCaller(
      'read',
      'res.partner',
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
    const filters = [];

    const from = req.query.from || '';
    const to = req.query.to || '';
    const statusArray = req.query.status && req.query.status.split(',');

    if (statusArray && statusArray.length > 0) {
      for (let i = 1; i < statusArray.length; i++) {
        filters.push('|');
      }
      statusArray.forEach((s) => {
        filters.push(['state',
          s === '2' ? 'in' : '=',
          s === '2' ? ['sale', 'done']
            : s === '0' ? 'draft'
              : s === '1' ? 'sent'
                : 'cancel']);
      });
    }

    if (from.length > 0) {
      filters.push(['confirmation_date', '>=', from]);
    }
    if (to.length > 0) {
      filters.push(['confirmation_date', '<=', to]);
    }

    const inParams = [filters];
    odooCaller(
      'search_count',
      'sale.order',
      res,
      [inParams],
    );
  } catch (e) {
    next(e);
  }
  return true;
};
