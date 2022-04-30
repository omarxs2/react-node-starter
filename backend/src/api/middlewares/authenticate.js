const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { ACCESS_DENIED } = require('../utils/customErrors/authErrors');
const { SESSION_KEY, ADMIN_SESSION_KEY } = require('../../config/vars');

module.exports = (role) => (req, res, next) => {
  let decoded;
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    decoded = jwt.verify(token, role === 'user' ? SESSION_KEY : ADMIN_SESSION_KEY);
  } catch (error) {
    return next(ACCESS_DENIED);
  }
  req.user = _.pick(decoded, ['id', 'email']);
  return next();
};
