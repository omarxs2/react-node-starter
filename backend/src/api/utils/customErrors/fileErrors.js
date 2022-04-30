const { ApiError } = require('./baseError');

exports.FILE_NOT_EXIST = new ApiError({
  message: 'File does not exist',
  status: 400,
  name: 'FILE_NOT_EXIST',
});

exports.MISSING_FILE = new ApiError({
  message: 'File is missing',
  status: 400,
  name: 'MISSING_FILE',
});
