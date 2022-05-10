const _ = require('lodash');
const Department = require('../models/department');
const IRepo = require('../repositories/iRepo');
const authErrors = require('../utils/customErrors/authErrors');



/**
 * Returns all departments
 * @public
 */
 exports.list = async (req, res, next) => {
  try {
    const departmentRepo = new IRepo(Department);

    const departments = await departmentRepo.findAll();
    return res.json({
      success: true,
      data: departments
    });
  } catch (e) {
    next(e);
  }
  return true;
};


/**
 * Create new department
 * @public
 */
exports.create = async (req, res, next) => {
  try {

    let department = await Department.create({
      ..._.pick(req.body, ['department_name_en', 'department_name_ar']),
    });
    department = department.dataValues;

    return res.json({
      success: true
    });
  } catch (e) {
    next(e);
  }
  return true;
};

/**
 * Updates department information
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const departmentRepo = new IRepo(Department);
    const department = await departmentRepo.findOneByField(id, 'id');
    if (!department) {
      throw authErrors.DEPARTMENT_NOT_FOUND;
    }

    department.department_name_en = req.body.department_name_en;
    department.department_name_ar = req.body.department_name_ar;

    await departmentRepo.updateOneByField(id, department);
    return res.json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
  return true;
};


/**
 * Delete department
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const departmentRepo = new IRepo(Department);

    const department = await departmentRepo.findOneByField(id, 'id');
    if (!department) {
      throw authErrors.DEPARTMENT_NOT_FOUND;
    }
    await departmentRepo.deleteObj(department);
    return res.json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
  return true;
};
