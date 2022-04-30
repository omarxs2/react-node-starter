const { ApiError } = require('./baseError');

exports.ROLE_NOT_EXIST = new ApiError({
  message: 'Role is not exist',
  status: 400,
  name: 'ROLE_NOT_EXIST',
});
