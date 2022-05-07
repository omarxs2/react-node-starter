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

    if(department!=''){
      where = {
        ...where,
        department_name_en: {
          [Op.eq]: department,
        },
      };
    }
    if(university!=''){
      where = {
        ...where,
        university: {
          [Op.eq]: university,
        },
      };
    }
    if(language!=''){
      where = {
        ...where,
        language: {
          [Op.eq]: language,
        },
      };
    }

    const prices = await priceRepo.findAllByMultipleFields(where)
    return res.json(prices);
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
      ..._.pick(req.body, ['department_name_en', 'department_name_ar',
        'university', 'language',
        'years', 'price_before', 'price_after']),
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

    price.department_name_en = req.body.department_name_en;
    price.department_name_ar = req.body.department_name_ar;
    price.university = req.body.university;
    price.language = req.body.language;
    price.years = req.body.years;
    price.price_before = req.body.price_before;
    price.price_after = req.body.price_after;

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
