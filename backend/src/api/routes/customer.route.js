const router = require('express').Router();
const controller = require('../controllers/customer.controller');
const rules = require('../validations/customer.validation');
const validate = require('../validations/handler');

router.route('/info')
  .get(validate(rules.getCustomerCreationInfo), controller.getCustomerCreationInfo);

router.route('/').post(validate(rules.create), controller.create);
router.route('/:id').put(validate(rules.update), controller.update);
module.exports = router;
