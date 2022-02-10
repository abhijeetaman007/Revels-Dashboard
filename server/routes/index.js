const express = require('express');
const router = express.Router();
const {
    userRegistrationValidation,
    userValidate,
    loginValidation,
} = require('../middleware/validate');
const { isUserLoggedIn, isEmailVerified } = require('../middleware/userAuth');
const { isCategoryLoggedIn } = require('../middleware/categoryAuth');
const {
    userRegister,
    userLogin,
    userLogout,
    userEmailVerify,
    userPassResetLink,
    userPassResetVerify,
    resendVerificationLink,
} = require('./user');
const {
    categoryRegister,
    categoryLogin,
    categoryLogout,
} = require('../routes/adminRoutes/category');
const { addEvent, getCategoryEvent } = require('../routes/adminRoutes/events');

//Routes:
router.get('/test', isUserLoggedIn, (req, res) => {
    res.send('Protected Route');
});

//User Routes:
router.post(
    '/user/register',
    userRegistrationValidation(),
    userValidate,
    userRegister
);
router.post(
    '/user/login',
    loginValidation(),
    userValidate,
    isEmailVerified,
    userLogin
);
router.get('/user/logout', userLogout);
router.get('/user/verify/:token', userEmailVerify);
router.post('/user/resendlink',resendVerificationLink)
router.post('/user/forgetpass/', userPassResetLink);
router.post('/user/forgetpass/verify', userPassResetVerify);

//Admin Routes :
//Category Routes
router.get('/category/register', categoryRegister);
router.post('/category/login', categoryLogin);
router.get('/category/logout', categoryLogout);
//Events
router.post('/category/addevent', addEvent);
router.get('/category/getevents', getCategoryEvent);

module.exports = router;
