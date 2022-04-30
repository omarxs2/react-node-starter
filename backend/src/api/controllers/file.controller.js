const File = require('../models/file');
const { currentDate } = require('../utils/helper');
const IRepo = require('../repositories/iRepo');
const { getFile } = require('../services/file');
const fileErrors = require('../utils/customErrors/fileErrors');

/**
 * Save File details to database
 * @public
 */
exports.post = async (req, res, next) => {
  try {
    if (req.file) {
      const file = await File.create({
        name: req.file.originalname.replace(/\s/g, ''),
        sizeKB: req.file.size,
        path: req.file.filename,
        contentType: req.file.mimetype,
        userId: req.user.id,
        uploadDate: currentDate(),
      });
      return res.status(200).json({
        path: file.dataValues.path,
      });
    }
    throw fileErrors.MISSING_FILE;
  } catch (e) {
    return next(e);
  }
};

/**
 * Get files
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const fileRepo = new IRepo(File);
    const file = await fileRepo.findOneByField(req.params.path, 'path');
    if (!file) {
      throw fileErrors.FILE_NOT_EXIST;
    }
    getFile(req.params.path, file.contentType, res);
    return true;
  } catch (e) {
    return next(e);
  }
};
