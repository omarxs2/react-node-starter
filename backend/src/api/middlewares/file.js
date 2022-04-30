/* eslint no-console: ["error", { allow: ["warn"] }] */
const { v4 } = require('uuid');
const multer = require('multer');
const { NFS_FOLDER } = require('../../config/vars');

const isAllowedMimetype = (mime) => [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/x-ms-bmp',
  'image/webp',
  'video/mp4',
  'video/x-msvideo',
  'video/mpeg',
  'video/webm',
  'audio/aac',
  'audio/mpeg',
  'audio/opus',
  'audio/wav',
  'audio/mp4',
  'audio/oog',
].includes(mime.toString());

const fileFilter = (req, file, cb) => {
  const fileMime = file.mimetype;
  if (isAllowedMimetype(fileMime)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Please use one of these files types: png, jpg, jpeg, gif, x-ms-bmp, webp, mp4, x-msvideo, mpeg, webm, aac, opus, wavmp4, oog',
      ), false,
    );
  }
};

const getUniqFileName = (file) => {
  const id = v4();
  const ext = file.originalname.split('.').pop();
  return `${file.fieldname}-${Date.now()}-${id}.${ext}`;
};

const storage = multer.diskStorage({
  destination: NFS_FOLDER,
  filename(req, file, cb) {
    try {
      const fileName = getUniqFileName(file);
      cb(null, fileName);
    } catch (error) {
      console.warn('[multer diskStorage] Error', error);
      cb(
        null,
        `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
      );
    }
  },
});

exports.handleUploadLocal = multer({
  storage,
  limits: {
    fileSize: 50000000,
  },
  fileFilter,
});
