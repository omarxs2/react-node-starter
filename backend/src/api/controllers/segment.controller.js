const _ = require('lodash');
const { Op } = require('sequelize');
const IRepo = require('../repositories/iRepo');
const odooCaller = require('../services/odooCaller');
const Segment = require('../models/segment');
const segmentErrors = require('../utils/customErrors/segmentErrors');
const { generateGoogleLink } = require('../services/generateGoogleLink');
const { longLatValidation } = require('../utils/helper');
const { ApiError } = require('../utils/customErrors/baseError');
/**
 * Create new segment
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const fields = ['partner_latitude', 'partner_longitude'];
    let payload;
    let inParams;
    const locations = await Promise.all(req.body.ordersList.map(async (item, i) => {
      inParams = [
        [parseInt(item[1], 10)],
        fields,
      ];
      payload = await Promise.resolve(odooCaller(
        'read',
        'res.partner',
        null,
        [inParams],
      ));
      const validate = longLatValidation(payload[0].partner_latitude, payload[0].partner_longitude)
      if (!validate[0] || !validate[1]) {
        throw new ApiError({
          message: `Order ${item[0]}: Location for customer ${item[1]} is not valid`,
          status: 400,
          name: 'LONG_LAT_NOT_FOUND',
        });
      }
      req.body.ordersList[i].push((payload[0].partner_latitude));
      req.body.ordersList[i].push(payload[0].partner_longitude);
      return (payload[0]);
    }));
    const link = await generateGoogleLink(locations);
    req.body.link = link;
    await Segment.create({
      ..._.pick(req.body, ['name', 'ordersList', 'link', 'driverId', 'driverName', 'deliveryDate']),
    });

    res.json({
      success: true,
    });
    await Promise.all(req.body.ordersList.map(async (item) => {
      inParams = [
        [parseInt(item[0], 10)], { driver_id: req.body.driverId },
      ];
      await Promise.resolve(odooCaller(
        'write',
        'sale.order',
        null,
        [inParams],
      ));
    }));
  } catch (e) {
    next(e);
  }
  return true;
};

/**
 * Updates segment information
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fields = ['partner_latitude', 'partner_longitude'];
    let payload;
    let inParams;
    let newSegment = [];
    let locations = []
    const segmentRepo = new IRepo(Segment);
    const segment = await segmentRepo.findOneByField(id, 'id');
    if (!segment) {
      throw segmentErrors.SEGMENT_NOT_FOUND;
    }
    let link = segment.link || ''
    const driverId = segment.driverId
    if (req.body.ordersList) {
      locations = await Promise.all(req.body.ordersList.map(async (item, i) => {
        if (item.length < 3) {
          newSegment.push(item[0]);
          inParams = [
            [parseInt(item[1], 10)],
            fields,
          ];
          payload = await Promise.resolve(odooCaller(
            'read',
            'res.partner',
            null,
            [inParams],
          ));
          const validate = longLatValidation(payload[0].partner_latitude, payload[0].partner_longitude)
          if (!validate[0] || !validate[1]) {
            throw new ApiError({
              message: `Order ${item[0]}: Location for customer ${item[1]} is not valid`,
              status: 400,
              name: 'LONG_LAT_NOT_FOUND',
            });
          }
          req.body.ordersList[i].push((payload[0].partner_latitude));
          req.body.ordersList[i].push(payload[0].partner_longitude);
          return (payload[0]);
        } else {
          return ({ partner_latitude: item[2], partner_longitude: item[3] });
        }
      }));
    }

    if (locations.length > 0) {
      link = await generateGoogleLink(locations)
    }
    segment.name = req.body.name;
    segment.link = link;
    segment.createdAt = req.body.createdAt;
    segment.driverId = req.body.driverId;
    segment.driverName = req.body.driverName;
    segment.ordersList = req.body.ordersList;
    segment.deliveryDate = req.body.deliveryDate;

    await segmentRepo.updateOneByField(id, segment);
    res.json({
      success: true,
    });

    await Promise.all(newSegment.map(async (item) => {
      inParams = [
        item, { driver_id: driverId },
      ];
      await Promise.resolve(odooCaller(
        'write',
        'sale.order',
        null,
        [inParams],
      ));
    }));

    req.body.deleted && await Promise.all(req.body.deleted.map(async (oId) => {
      inParams = [
        [parseInt(oId, 10)], { driver_id: null },
      ];
      await Promise.resolve(odooCaller(
        'write',
        'sale.order',
        null,
        [inParams],
      ));
    }));
  } catch (e) {
    next(e);
  }
  return true;
};

/**
 * Returns all segment
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const limit = parseInt((req.query.limit || 20), 10);
    const skipIndex = ((req.query.page || 1) - 1) * limit;
    const driverArray = req.query.driverId && req.query.driverId.split(',') || '';
    const from = req.query.from || '';
    const to = req.query.to || '';

    let where = {};
    if (from.length > 0) {
      where = {
        deliveryDate: {
          [Op.gte]: new Date(from),
        },
      };
    }
    if (to.length > 0) {
      where.deliveryDate = {
        ...where.deliveryDate,
        [Op.lte]: new Date(to)

      }
    }
    if (driverArray.length > 0) {
      let or = []
      driverArray.map(d => {
        or.push(
          { driverId: parseInt(d, 10) }
        )
      })
      where = {
        ...where,
        [Op.or]: or
      }
    }
    const segmentRepo = new IRepo(Segment);
    const segments = await segmentRepo.findAllWithPagination(
      limit,
      skipIndex,
      where,
    );
    return res.json(segments);
  } catch (e) {
    next(e);
  }
  return true;
};

/**
 * Updates segment information
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const segmentRepo = new IRepo(Segment);

    const segment = await segmentRepo.findOneByField(id, 'id');
    if (!segment) {
      throw segmentErrors.SEGMENT_NOT_FOUND;
    }
    await segmentRepo.deleteObj(segment);
    return res.json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
  return true;
};
