const bcrypt = require('bcryptjs');
const _ = require('lodash');
const User = require('../models/user');
const IRepo = require('../repositories/iRepo');
const authErrors = require('../utils/customErrors/authErrors');
const { jwtToken } = require('../services/tokenGenerator');
const sendMail = require('../services/sendMail');
/**
 * Generate jwt token
 * @private
 */
const authResponse = async (req, res, next) => {
  try {
    const token = jwtToken(req.user);

    res.json({
      token,
      ..._.pick(req.user, ['id', 'name', 'email', 'phone', 'country', 'company', 'logo', 'role', 'isActive']),
    });
  } catch (e) {
    next(e);
  }
};

/**
 * Returns jwt token if login was successful
 * @public
 */
exports.login = [
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const iRepo = new IRepo(User);

      const user = await iRepo.findOneByField(email, 'email');
      if (!user) {
        throw authErrors.USER_NOT_FOUND;
      }

      bcrypt.compare(password, user.password, async (err, isMatch) => {
        try {
          if (!isMatch) {
            throw authErrors.PASSWORD_NOT_MATCH;
          } else if (!user.isActive) {
            throw authErrors.BLOCKED_USER;
          }
          return next();
        } catch (e) {
          return next(e);
        }
      });
      req.user = user;
      return true;
    } catch (e) {
      return next(e);
    }
  },
  authResponse,
];

/**
 * Returns jwt token if login was successful
 * @public
 */
exports.adminLogin = [
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const iRepo = new IRepo(User);

      const user = await iRepo.findOneByField(email, 'email');
      if (!user) {
        throw authErrors.USER_NOT_FOUND;
      }

      bcrypt.compare(password, user.password, async (err, isMatch) => {
        try {
          if (!isMatch || user.roleId !== 1) {
            throw authErrors.PASSWORD_NOT_MATCH;
          } else if (!user.isActive) {
            throw authErrors.BLOCKED_USER;
          }
          return next();
        } catch (e) {
          return next(e);
        }
      });
      req.user = { ..._.pick(user, ['email', 'id', 'roleId', 'name']) };
      return true;
    } catch (e) {
      return next(e);
    }
  },
  authResponse,
];

/**
 * Returns success if email sent successful
 * @public
 */
exports.forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userRepo = new IRepo(User);

    const user = await userRepo.findOneByField(email, 'email');
    if (!user) {
      throw authErrors.USER_NOT_FOUND;
    }
    const newPassword = Math.random()
      .toString(36)
      .slice(-8);

    user.password = await bcrypt.hash(newPassword, 10);
    await userRepo.updateOneByField(user.id, user);

    await sendMail(user.email, 'FORGET PASSWORD', 'forget-pass', {
      name: user.name,
      password: newPassword,
    });
    return res.json({
      success: true,
    });
  } catch (e) {
    return next(e);
  }
};

/**
 * Returns success if password reseted successful
 * @public
 */
exports.resetPassword = async (req, res, next) => {
  try {
    const { oldPassword, password } = req.body;
    const userRepo = new IRepo(User);

    const user = await userRepo.findOneByField(req.user.id, 'id');
    if (!user) {
      throw authErrors.USER_NOT_FOUND;
    }

    bcrypt.compare(oldPassword, user.password, async (err, isMatch) => {
      try {
        if (!isMatch) {
          throw authErrors.PASSWORD_NOT_MATCH;
        } else {
          user.password = await bcrypt.hash(password, 10);
          await userRepo.updateOneByField(user.id, user);

          return res.json({
            success: true,
          });
        }
      } catch (e) {
        return next(e);
      }
    });
    return true;
  } catch (e) {
    return next(e);
  }
};

/**
 * Returns user information
 * @public
 */
exports.retrieveInfo = async (req, res, next) => {
  try {
    const { id } = req.user;
    const userRepo = new IRepo(User);

    const user = await userRepo.findOneByField(id, 'id');
    if (!user) {
      throw authErrors.USER_NOT_FOUND;
    }
    return res.json({
      ..._.pick(user, [
        'id',
        'firstName',
        'lastName',
        'email',
        'interests',
      ]),

    });
  } catch (e) {
    next(e);
  }
  return true;
};
