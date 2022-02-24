const { check, validationResult } = require("express-validator");

const userRegistrationValidation = () => {
  return [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Must be at least 3 characters long"),
    check("email").isEmail().withMessage("Enter a valid Email"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password of minimum 8 characters is required"),
    check("mobileNumber")
      .isNumeric()
      .isLength({ min: 10, max: 10 })
      .withMessage("Please Enter a valid Mobile Number"),
    check("registrationNumber", "Please enter College Registration Number")
      .not()
      .isEmpty(),
    check("college", "Enter your College name").not().isEmpty(),
    check("branch", "Enter your branch").not().isEmpty(),
    check("state", "Enter a valid State").not().isEmpty(),
  ];
};

const loginValidation = () => {
  return [
    check("email").isEmail().withMessage("Enter a valid Email"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password of minimum 8 characters is required"),
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

  return res.send({ success: false, msg: extractedErrors });
};

module.exports = {
  userValidate,
  userRegistrationValidation,
  loginValidation,
};
