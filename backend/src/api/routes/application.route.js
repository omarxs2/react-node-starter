const router = require('express').Router();
const validate = require('../validations/handler');
const controller = require('../controllers/application.controller');
const rules = require('../validations/application.validation');
const authenticate = require('../middlewares/authenticate');


router
    .route('/')
    .post(
        validate(rules.create),
        controller.create
    );

router
    .route('/check-email')
    .get(
        validate(rules.checkEmail),
        controller.checkEmail
    );

router
    .route('/')
    .get(
        authenticate('user'),
        validate(rules.get),
        controller.list
    );

router
    .route('/')
    .get(
        authenticate('admin'),
        validate(rules.get),
        controller.list
    );


module.exports = router;
