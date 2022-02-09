const express = require('express');
const router = express.Router();
const {
    userRegistrationValidation,
    userValidate,
    loginValidation,
} = require('../middleware/validate');
const { isUserLoggedIn } = require('../middleware/userAuth');
const { isCategoryLoggedIn } = require('../middleware/categoryAuth');
const {
    userRegister,
    userLogin,
    userLogout,
    userEmailVerify,
    userPassResetLink,
    userPassResetVerify,
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
router.post('/user/login', loginValidation(), userValidate, userLogin);
router.get('/user/logout', userLogout);
router.get('/user/verify/:token', userEmailVerify);
router.get('/user/forgetpass/', userPassResetLink);
router.post('/user/forgetpass/', userPassResetVerify);

//Admin Routes :
//Category Routes
router.get('/category/register', categoryRegister);
router.post('/category/login', categoryLogin);
router.get('/category/logout', categoryLogout);
//Events
router.post('/category/addevent', addEvent);
router.get('/category/getevents', getCategoryEvent);

module.exports = router;
