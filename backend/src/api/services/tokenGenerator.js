const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { SESSION_KEY, ADMIN_SESSION_KEY } = require('../../config/vars');

module.exports = {
  jwtToken: (user) => {
    const token = jwt.sign(
      { ..._.pick(user, ['email', 'id', 'role']) },
      user.role === 'admin' ? ADMIN_SESSION_KEY : SESSION_KEY,
      { expiresIn: user.role === 'admin' ? '5d' : '15d' },
    );
    return token;
  },
};
