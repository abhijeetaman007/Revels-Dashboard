const express = require('express');
const router = express.Router();
const { userRegister, userLogin, userLogout } = require('./user');
const {userRegistrationValidation,userValidate,loginValidation} = require('../middleware/validate')

//Routes:

//User - Auth
router.post('/user/register',userRegistrationValidation(),userValidate, userRegister);
router.post('/user/login',loginValidation(),userValidate,userLogin);
router.get('/user/logout', userLogout);

module.exports = router;
