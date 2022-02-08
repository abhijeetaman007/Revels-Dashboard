const { check, validationResult } = require('express-validator');

const userRegistrationValidation = () => {
    return [
        check('name')
            .isAlpha()
            .withMessage('Must contain only alphabetical characters')
            .isLength({ min: 3 })
            .withMessage('Must be at least 3 characters long'),
        check('email').isEmail().withMessage('Enter a valid Email'),
        check('password')
            .isLength({ min: 8 })
            .withMessage('Password of minimum 8 characters is required'),
        check('mobileNumber')
            .isNumeric()
            .isLength({ min: 10, max: 10 })
            .withMessage('Please Enter a valid Mobile Number'),
        check(
            'registrationNumber',
            'Please enter College Registration Number'
        ).exists(),
        check('college', 'Enter your College name').exists(),
        check('branch', 'Enter your branch').exists(),
        check('isMahe', 'Do you belong to MAHE or not?').exists(),
        check('IDCardLink', 'Please enter ID Card Link').exists(),
        check('covidVaccinationLink', 'Please enter ID Card Link').exists(),
        check('state', 'Enter a valid State').exists(),
    ];
};

const loginValidation = () => {
    return [
        check('email').isEmail().withMessage('Enter a valid Email'),
        check('password')
            .isLength({ min: 8 })
            .withMessage('Password of minimum 8 characters is required'),
    ];
};

const userValidate = (req, res, next) => {
    const errorArray = validationResult(req);
    if (errorArray.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errorArray
        .array()
        .map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.send({ success: false, message: extractedErrors });
};

module.exports = {
    userValidate,
    userRegistrationValidation,
    loginValidation,
};
