const router = require('express').Router();
const validate = require('../validations/handler');
const controller = require('../controllers/user.controller');
const rules = require('../validations/user.validation');

router
  .route('/')
  .get(controller.list)
  .post(validate(rules.create), controller.create);

router
  .route('/:id')
  .patch(validate(rules.update), controller.update)
  .delete(controller.delete);
module.exports = router;
