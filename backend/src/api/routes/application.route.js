const router = require('express').Router();
const validate = require('../validations/handler');
const controller = require('../controllers/application.controller');
const rules = require('../validations/application.validation');
const authenticate = require('../middlewares/authenticate');


router.route('/').post(validate(rules.create), controller.create);

router.route('/check-email').get(validate(rules.checkEmail), controller.checkEmail);

router.route('/all').get(
    authenticate('admin'),
    validate(rules.get),
    controller.listAll
);

router.route('/agent').get(
    authenticate('user'),
    validate(rules.get),
    controller.list
);

router.route('/:id').get(
    authenticate('user'),
    validate(rules.getSingle),
    controller.getSingleApplication
);

router
  .route('/:id')
  .patch(validate(rules.update), controller.update);


router.route('/admin/:id').get(
    authenticate('admin'),
    validate(rules.getSingle),
    controller.adminGetSingleApplication
);


module.exports = router;
