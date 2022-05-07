const router = require('express').Router();
const validate = require('../validations/handler');
const controller = require('../controllers/auth.controller');
const rules = require('../validations/auth.validation');
const authenticate = require('../middlewares/authenticate');

router.route('/login').post(validate(rules.login), controller.login);

router.route('/user-reset-password').post(authenticate('user'), validate(rules.resetPassword), controller.resetPassword);
router.route('/admin-reset-password').post(authenticate('admin'), validate(rules.resetPassword), controller.resetPassword);

router.route('/admin-forget-password').post(validate(rules.forgetPassword), controller.forgetPassword);
router.route('/user-forget-password').post(validate(rules.forgetPassword), controller.forgetPassword);


module.exports = router;
