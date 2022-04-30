const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { SESSION_KEY, ADMIN_SESSION_KEY } = require('../../config/vars');

module.exports = {
  jwtToken: (user) => {
    const token = jwt.sign(
      { ..._.pick(user, ['email', 'id', 'roleId']) },
      user.roleId === 1 ? ADMIN_SESSION_KEY : SESSION_KEY,
      { expiresIn: user.role === 'user' ? '180d' : '30d' },
    );
    return token;
  },
};
