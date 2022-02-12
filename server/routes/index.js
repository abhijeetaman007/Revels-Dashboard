const express = require('express');
const router = express.Router();
const {
    userRegistrationValidation,
    userValidate,
    loginValidation,
} = require('../middleware/validate');
const {
    isUserLoggedIn,
    isEmailVerified,
    isVerifiedForRevels,
} = require('../middleware/userAuth');
const { isCategoryLoggedIn } = require('../middleware/categoryAuth');
const {
    userRegister,
    userLogin,
    userLogout,
    userEmailVerify,
    userPassResetLink,
    userPassResetVerify,
    resendVerificationLink,
    updateDriveLink,
} = require('./userRoutes/user');
const { registerEvent, getUserEvents,getAllEvents } = require('./userRoutes/event');
const {
    categoryRegister,
    categoryLogin,
    categoryLogout,
} = require('../routes/adminRoutes/category');
const { addEvent, getCategoryEvent } = require('../routes/adminRoutes/events');
const {
    teamRegister,
    joinTeam,
    leaveTeam,
} = require('../routes/userRoutes/team');

//Routes:
router.get('/test', isUserLoggedIn, (req, res) => {
    res.send('Protected Route');
});

//@User Routes:
// Auth:
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
router.post('/user/resendlink', resendVerificationLink);
router.post('/user/forgetpass/', userPassResetLink);
router.post('/user/forgetpass/verify', userPassResetVerify);
//Update User Profile:
router.post('/user/updatedrivelink',isUserLoggedIn,updateDriveLink)

//Team:
router.post(
    '/user/team/register',
    isUserLoggedIn,
    isVerifiedForRevels,
    teamRegister
);
router.post(
    '/user/team/jointeam',
    isUserLoggedIn,
    isVerifiedForRevels,
    joinTeam
);
router.post('/team/leaveteam', isUserLoggedIn, isVerifiedForRevels, leaveTeam);
//Events:
router.post(
    '/user/event/register',
    isUserLoggedIn,
    isVerifiedForRevels,
    registerEvent
);
router.get(
    '/user/event/getevents',
    isUserLoggedIn,
    isVerifiedForRevels,
    getUserEvents
);
router.get('/user/event/getallevents',isUserLoggedIn,getAllEvents)


//@Admin Routes :
//Category Routes
router.get('/category/register', categoryRegister);
router.post('/category/login', categoryLogin);
router.get('/category/logout', categoryLogout);
//Events
router.post('/category/addevent',isCategoryLoggedIn, addEvent);
router.get('/category/getevents',isCategoryLoggedIn, getCategoryEvent);

module.exports = router;
