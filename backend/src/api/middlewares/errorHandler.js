/* eslint no-console: ["error", { allow: ["warn"] }] */
/* eslint no-return-assign: "error" */
const httpStatus = require('http-status');
const { NODE_ENV } = require('../../config/vars');

/**
 * Change sequelize validation errors
 */
const formValidation = (err, req, res, next) => {
  if (
    err.name === 'SequelizeValidationError'
    || err.name === 'SequelizeUniqueConstraintError'
  ) {
    const errors = {};

    err.errors.forEach((error) => (
      errors[error.path] = error.message
    ));

    return res.status(400).json({ name: err.name, errors });
  }
  return next(err);
};

/**
 * Catch invalid token error
 */
const invalidToken = (err, req, res, next) => {
  if (err.name !== 'UnauthorizedError') return next(err);
  const message = err.message === 'jwt expired' ? 'Token has been expired' : 'Invalid token';
  return res.status(httpStatus.UNAUTHORIZED).json({ message });
};

/**
 * Unexpected errors handler
 */
/* eslint-disable-next-line no-unused-vars */
const other = (err, req, res, next) => {
  if (!err.isOperational) {
    console.warn(err);
    res.status(err).json(err);
    return;
  }

  const response = {
    status: err.status,
    message: err.message,
    name: err.name,
    errors: err.index,
    stack: err.stack,
  };

  if (NODE_ENV === 'production') delete response.stack;
  res.status(response.status).json(response);
};

module.exports = [formValidation, invalidToken, other];
