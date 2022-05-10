const _ = require('lodash');
const Price = require('../models/price');
const IRepo = require('../repositories/iRepo');
const authErrors = require('../utils/customErrors/authErrors');
const { Op } = require('sequelize');


/**
 * Returns all prices
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const priceRepo = new IRepo(Price);

    const department = req.query.department || '';
    const university = req.query.university || '';
    const language = req.query.language || '';

    let where = {};

    if (department != '') {
      where = {
        ...where,
        department_id: {
          [Op.eq]: department,
        },
      };
    }
    if (university != '') {
      where = {
        ...where,
        university_id: {
          [Op.eq]: university,
        },
      };
    }
    if (language != '') {
      where = {
        ...where,
        language: {
          [Op.eq]: language,
        },
      };
    }

    const prices = await priceRepo.findAllByMultipleFields(where)
    return res.json({
      success: true,
      data: prices
    });
  } catch (e) {
    next(e);
  }
  return true;
};


/**
 * Create new price
 * @public
 */
exports.create = async (req, res, next) => {
  try {

    let price = await Price.create({
      ..._.pick(req.body, ['department_id',
        'university_id', 'language', 'years','degree',
        'currency', 'price_before', 'price_after']),
    });
    price = price.dataValues;
    return res.json({
      success: true
    });
  } catch (e) {
    next(e);
  }
  return true;
};

/**
 * Updates price information
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const priceRepo = new IRepo(Price);
    const price = await priceRepo.findOneByField(id, 'id');
    if (!price) {
      throw authErrors.USNIVERSITY_NOT_FOUND;
    }

    price.department_id = req.body.department_id;
    price.university_id = req.body.university_id;
    price.language = req.body.language;
    price.currency = req.body.currency;
    price.price_before = req.body.price_before;
    price.price_after = req.body.price_after;
    price.years = req.body.years;
    price.degree = req.body.degree;

    await priceRepo.updateOneByField(id, price);
    return res.json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
  return true;
};


/**
 * Delete price
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const priceRepo = new IRepo(Price);

    const price = await priceRepo.findOneByField(id, 'id');
    if (!price) {
      throw authErrors.USNIVERSITY_NOT_FOUND;
    }
    await priceRepo.deleteObj(price);
    return res.json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
  return true;
};
