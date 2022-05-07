const _ = require('lodash');
const University = require('../models/university');
const IRepo = require('../repositories/iRepo');
const authErrors = require('../utils/customErrors/authErrors');



/**
 * Returns all universities
 * @public
 */
 exports.list = async (req, res, next) => {
  try {
    const universityRepo = new IRepo(University);

    const universities = await universityRepo.findAll();
    return res.json(universities);
  } catch (e) {
    next(e);
  }
  return true;
};


/**
 * Create new university
 * @public
 */
exports.create = async (req, res, next) => {
  try {

    let university = await University.create({
      ..._.pick(req.body, ['university_name_en', 'university_name_ar', 'color']),
    });
    university = university.dataValues;

    return res.json({
      success: true
    });
  } catch (e) {
    next(e);
  }
  return true;
};

/**
 * Updates university information
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const universityRepo = new IRepo(University);
    const university = await universityRepo.findOneByField(id, 'id');
    if (!university) {
      throw authErrors.USNIVERSITY_NOT_FOUND;
    }

    university.university_name_en = req.body.university_name_en;
    university.university_name_ar = req.body.university_name_ar;
    university.color = req.body.color;


    await universityRepo.updateOneByField(id, university);
    return res.json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
  return true;
};


/**
 * Delete university
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const universityRepo = new IRepo(University);

    const university = await universityRepo.findOneByField(id, 'id');
    if (!university) {
      throw authErrors.USNIVERSITY_NOT_FOUND;
    }
    await universityRepo.deleteObj(university);
    return res.json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
  return true;
};
