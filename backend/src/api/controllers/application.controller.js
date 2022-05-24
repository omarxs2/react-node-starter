const _ = require('lodash');
const Application = require('../models/application');
const User = require('../models/user');
const Department = require('../models/department');
const University = require('../models/university');
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
    req.body.reference_code = `Application-${code}`;
    req.body.status = 'pending';

    let application = await Application.create({
      ..._.pick(req.body, [
        'full_name', 'email', 'phone', 'father', 'mother', 'passport_number', 'nationality',
        'school_name', 'gpa', 'graduation_year', 'address', 'degree', 'department', 'agent_name', 'company',
        'language', 'university', 'transcript', 'diploma', 'passport', 'personal_image', 'other_files',
        'reference_code', 'agent_id', 'status']),
    });

    application = application.dataValues;
    return res.json({
      success: true,
      reference_code: req.body.reference_code
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

    if(req.body.notes){
      application.notes = req.body.notes;
    }
    if(req.body.status){
      application.status = req.body.status;
    }
    if(req.body.final_acceptance){
      application.final_acceptance = req.body.final_acceptance;
    }
    if(req.body.conditional_acceptance){
      application.conditional_acceptance = req.body.conditional_acceptance;
    }
    if(req.body.payment_receipt){
      application.payment_receipt = req.body.payment_receipt;
    }


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
exports.listAll = async (req, res, next) => {
  try {
    const applicationRepo = new IRepo(Application);
    const applications = await applicationRepo.findAll();

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
 * Returns agent applications
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const applicationRepo = new IRepo(Application);

    const applications = await applicationRepo.findAllByFieldAttr(req.user.id, 'agent_id',
      [
        'agent_id', 'passport', 'transcript',
        'address', 'diploma', 'father',
        'gpa', 'graduation_year', 'mother',
        'nationality', 'notes', 'other_files',
        'payment_receipt', 'personal_image', 'reference_code',
        'school_name'
      ])

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
 * Returns agent applications
 * @public
 */
exports.getSingleApplication = async (req, res, next) => {
  try {
    const applicationRepo = new IRepo(Application);

    const application = await applicationRepo.findOneByField(req.params.id, 'id')

    if (application?.agent_id != req.user.id || !application) {
      throw authErrors.ACCESS_DENIED;
    }

    return res.json({
      success: true,
      data: application
    });

  } catch (e) {
    next(e);
  }
  return true;
};


exports.adminGetSingleApplication = async (req, res, next) => {
  try {
    const applicationRepo = new IRepo(Application);
    const application = await applicationRepo.findOneByField(req.params.id, 'id')

    return res.json({
      success: true,
      data: application
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



