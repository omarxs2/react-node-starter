const httpStatus = require('http-status');
const { ApiError } = require('./baseError');

exports.INVALID_CREDENTIALS = new ApiError({
  message: 'Invalid email or password',
  status: httpStatus.UNAUTHORIZED,
  name: 'INVALID_CREDENTIALS',
});

exports.INVALID_SOCIAL = (name) => new ApiError({
  message: `Invalid ${name} access token`,
  status: httpStatus.UNAUTHORIZED,
  name: 'INVALID_SOCIAL',
});

exports.INVALID_TOKEN = new ApiError({
  message: 'Invalid token',
  status: httpStatus.UNAUTHORIZED,
  name: 'INVALID_TOKEN',
});

exports.BLOCKED_USER = new ApiError({
  message: 'User is blocked',
  status: httpStatus.UNAUTHORIZED,
  name: 'BLOCKED_USER',
});

exports.ACCESS_DENIED = new ApiError({
  message: 'Access denied',
  status: httpStatus.FORBIDDEN,
  name: 'ACCESS_DENIED',
});

exports.USER_NOT_FOUND = new ApiError({
  message: "Can't find user with this email",
  status: 400,
  name: 'USER_NOT_FOUND',
});

exports.USNIVERSITY_NOT_FOUND = new ApiError({
  message: "Can't find university with this id",
  status: 400,
  name: 'USNIVERSITY_NOT_FOUND',
});

exports.DEPARTMENT_NOT_FOUND = new ApiError({
  message: "Can't find department with this id",
  status: 400,
  name: 'DEPARTMENT_NOT_FOUND',
});

exports.ROLE_NOT_EXIST = new ApiError({
  message: "Can't find this role",
  status: 400,
  name: 'ROLE_NOT_EXIST',
});

exports.PRICE_NOT_FOUND = new ApiError({
  message: "Can't find price with this id",
  status: 400,
  name: 'PRICE_NOT_FOUND',
});

exports.PASSWORD_NOT_MATCH = new ApiError({
  message: 'Password is wrong',
  status: 400,
  name: 'PASSWORD_NOT_MATCH',
});

exports.RESET_TOKEN_INVALID = new ApiError({
  message: 'Reset password token is invalid',
  status: 400,
  name: 'RESET_TOKEN_INVALID',
});

exports.REFRESH_TOKEN_INVALID = new ApiError({
  status: httpStatus.UNAUTHORIZED,
  message: 'Refresh token is invalid',
  name: 'REFRESH_TOKEN_INVALID',
});
