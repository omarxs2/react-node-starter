const { ApiError } = require('./baseError');

exports.TYPE_IS_INVALID = new ApiError({
  message: 'Type is invalid',
  status: 400,
  name: 'TYPE_IS_INVALID',
});
