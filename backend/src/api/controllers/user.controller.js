const bcrypt = require('bcryptjs');
const _ = require('lodash');
const User = require('../models/user');
const IRepo = require('../repositories/iRepo');
const authErrors = require('../utils/customErrors/authErrors');
const sendMail = require('../services/sendMail');

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    let roleCheck = ['admin', 'agent', 'subagent'].filter(f => f === req.body.role).length

    if (roleCheck < 1) {
      throw roleErrors.ROLE_NOT_EXIST;
    }
    const password = Math.random()
      .toString(36)
      .slice(-8);

    req.body.password = password;
    let user = await User.create({
      ..._.pick(req.body, ['email', 'password', 'name', 'role', 'isActive', 'phone', 'country', 'company', 'logo']),
    });
    user = user.dataValues;
    // sendMail(user.email, 'Welcome to Eduturk', 'invite-user', {
    //   name: user.name,
    //   password,
    //   email: user.email,
    // });
    return res.json({
      success: true,
      password
    });
  } catch (e) {
    next(e);
  }
  return true;
};

/**
 * Updates user information
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userRepo = new IRepo(User);
    const user = await userRepo.findOneByField(id, 'id');
    if (!user) {
      throw authErrors.USER_NOT_FOUND;
    }

    let roleCheck = ['admin', 'agent', 'subagent'].filter(f => f === user.role).length

    if (roleCheck < 1) {
      throw roleErrors.ROLE_NOT_EXIST;
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.isActive = req.body.isActive;
    user.role = req.body.role;
    user.phone = req.body.phone;
    user.country = req.body.country;
    user.company = req.body.company;
    user.logo = req.body.logo;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    await userRepo.updateOneByField(id, user);
    return res.json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
  return true;
};

/**
 * Returns all users
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const userRepo = new IRepo(User);

    const users = await userRepo.findAll();
    return res.json(users);
  } catch (e) {
    next(e);
  }
  return true;
};

/**
 * Updates user information
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userRepo = new IRepo(User);

    const user = await userRepo.findOneByField(id, 'id');
    if (!user) {
      throw authErrors.USER_NOT_FOUND;
    }
    await userRepo.deleteObj(user);
    return res.json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
  return true;
};
