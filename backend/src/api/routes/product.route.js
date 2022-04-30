const router = require('express').Router();
const controller = require('../controllers/product.controller');

router.route('/').get(controller.list);
router.route('/count').get(controller.count);

module.exports = router;
