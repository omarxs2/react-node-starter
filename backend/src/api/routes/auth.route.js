const router = require('express').Router();
const validate = require('../validations/handler');
const controller = require('../controllers/auth.controller');
const rules = require('../validations/auth.validation');
const authenticate = require('../middlewares/authenticate');

router.route('/login').post(validate(rules.login), controller.login);
router.route('/forget-password').post(validate(rules.forgetPassword), controller.forgetPassword);
router.route('/reset-password').post(authenticate('user'), validate(rules.resetPassword), controller.resetPassword);

router.route('/admin/login').post(validate(rules.login), controller.adminLogin);
router.route('/admin/forget-password').post(validate(rules.forgetPassword), controller.forgetPassword);
router.route('/admin/reset-password').post(authenticate('admin'), validate(rules.resetPassword), controller.resetPassword);

module.exports = router;
