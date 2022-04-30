const router = require('express').Router();
const controller = require('../controllers/file.controller');
const { handleUploadLocal } = require('../middlewares/file');

router.route('/:path').get(controller.get);

router.route('/')
  .post((req, res, next) => {
    handleUploadLocal.single('file')(req, res, (error) => {
      if (error) {
        return res.json({
          success: false,
          message: error.message,
        });
      }
      controller.post(req, res, next);
      return true;
    });
  },
  (error, res) => {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  });

module.exports = router;
