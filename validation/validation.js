const { check } = require('express-validator');

exports.addContactValidation = [
    check('firstName', 'name is reqired').not().isEmpty(),
    check('lastName', 'last name is required').not().isEmpty(),
    check('email', "please input a valid email").isEmail(),
    check('favoriteColor', 'add a favorite color').not().isEmpty(),
    check('birthday', 'please add birthday').not().isEmpty()
]