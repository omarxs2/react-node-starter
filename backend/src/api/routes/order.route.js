const router = require('express').Router();
const controller = require('../controllers/order.controller');
const rules = require('../validations/order.validation');
const validate = require('../validations/handler');

router.route('/list').post(controller.list);
router.route('/').post(validate(rules.create), controller.create);
router.route('/:id').put(validate(rules.update), controller.update);
router.route('/info').get(validate(rules.getOrderCreationInfo), controller.getOrderCreationInfo);
router.route('/product/uom').get(validate(rules.getProductDetails), controller.getProductDetails);
router.route('/lines').get(validate(rules.getOrderLines), controller.getOrderLines);
router.route('/customer/:customerId').get(validate(rules.getOrderCustomer), controller.getOrderCustomer);
router.route('/count').get(controller.count);
module.exports = router;
