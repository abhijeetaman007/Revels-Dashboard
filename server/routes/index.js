const express = require('express');
const router = express.Router();
const { userRegister, userLogin, userLogout } = require('./user');
const {userRegistrationValidation,userValidate,loginValidation} = require('../middleware/validate')
const {isUserLoggedIn} = require("../middleware/userAuth")

//Routes:
router.get('/test',isUserLoggedIn,(req,res)=>{
    res.send("Protected Route")
})

//User - Auth
router.post('/user/register',userRegistrationValidation(),userValidate, userRegister);
router.post('/user/login',loginValidation(),userValidate,userLogin);
router.get('/user/logout', userLogout);

module.exports = router;
