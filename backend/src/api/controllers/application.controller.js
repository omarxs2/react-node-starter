const _ = require('lodash');
const Application = require('../models/application');
const IRepo = require('../repositories/iRepo');
const authErrors = require('../utils/customErrors/authErrors');
const { v4 } = require('uuid');

/**
 * Create new application
 * @public
 */
exports.create = async (req, res, next) => {
  try {

    const code = v4();
    req.body.reference_code = code;
    req.body.status = 'pending';

    let application = await Application.create({
      ..._.pick(req.body, [
        'full_name', 'email', 'phone', 'father', 'mother', 'passport_number', 'nationality',
        'school_name', 'gpa', 'graduation_year', 'address', 'degree', 'department', 'name',
        'language', 'university', 'transcript', 'diploma', 'passport', 'personal_image', 'other_files',
        'reference_code', 'agent_id', 'status']),
    });

    application = application.dataValues;
    return res.json({
      success: true,
      reference_code: code

    });
  } catch (e) {
    next(e);
  }
  return true;
};

/**
 * Updates application information
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const applicationRepo = new IRepo(Application);
    const application = await applicationRepo.findOneByField(id, 'id');
    if (!application) {
      throw authErrors.USER_NOT_FOUND;
    }

    application.notes = req.body.notes;
    application.final_acceptance = req.body.final_acceptance;
    application.conditional_acceptance = req.body.conditional_acceptance;
    application.payment_receipt = req.body.payment_receipt;
    application.status = req.body.status;

    await applicationRepo.updateOneByField(id, application);
    return res.json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
  return true;
};


/**
 * Returns all applications
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const applicationRepo = new IRepo(Application);

    // const department = req.query.department || '';
    // const university = req.query.university || '';
    // const language = req.query.language || '';

    let where = {};

    // if (department != '') {
    //   where = {
    //     ...where,
    //     department_id: {
    //       [Op.eq]: department,
    //     },
    //   };
    // }
    // if (university != '') {
    //   where = {
    //     ...where,
    //     university_id: {
    //       [Op.eq]: university,
    //     },
    //   };
    // }
    // if (language != '') {
    //   where = {
    //     ...where,
    //     language: {
    //       [Op.eq]: language,
    //     },
    //   };
    // }

    const applications = await applicationRepo.findAllByMultipleFields(where)
    return res.json({
      success: true,
      data: applications
    });
  } catch (e) {
    next(e);
  }
  return true;
};


/**
 * Returns trye if there is application with this email
 * @public
 */
exports.checkEmail = async (req, res, next) => {
  try {
    const applicationRepo = new IRepo(Application);


    const applications = await applicationRepo.findAllByField(req.query.email, 'email')

    return res.json({
      success: true,
      exist: applications.length > 0 ? true : false

    });
  } catch (e) {
    next(e);
  }
  return true;
};



