const router = require('express').Router();
const controller = require('../controllers/role.controller');

router.route('/').get(controller.get);
module.exports = router;
