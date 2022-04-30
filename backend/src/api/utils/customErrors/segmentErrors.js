const { ApiError } = require('./baseError');

exports.SEGMENT_NOT_FOUND = new ApiError({
  message: 'Segment is not exist',
  status: 400,
  name: 'SEGMENT_NOT_FOUND',
});
