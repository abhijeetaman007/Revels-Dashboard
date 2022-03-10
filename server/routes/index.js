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
// const { isCategoryLoggedIn } = require('../middleware/categoryAuth');
const {
    isSysAdmin,
    isAdminLoggedIn,
    isOperations,
    isCategory,
} = require('../middleware/adminAuth');
const {
    userRegister,
    userLogin,
    userLogout,
    userEmailVerify,
    userPassResetLink,
    userPassResetVerify,
    resendVerificationLink,
    getUserFromToken,
    updateAccommodation,
} = require('./user/user');
const { registerEvent, getUserEvents, getAllEvents } = require('./user/event');
const {
    addEvent,
    getCategoryEvent,
    updateEvent,
    deleteEvent,
} = require('./admins/category');
const { joinTeam, leaveTeam } = require('./user/team');
const {
    registerOrder,
    verifyPayment,
    verifyPaymentAlternate,
} = require('./user/razorpay');
const {
    addDelegateCard,
    deleteDelegateCard,
    viewAllDelegateCards,
    addRole,
} = require('./admins/sysAdmin');
const {
    getAllDelegateCards,
    getMyDelegateCards,
    getAllMyTransactions,
} = require('./user/delegateCard');
const { getAllColleges } = require('./user/college');
const { setEventScheldule } = require('./admins/operations');
const {
    adminRegister,
    categoryRegister,
    adminLogin,
    adminLogout,
    getAdminFromToken,
} = require('./admins/auth');

//Routes:
router.get('/test', (req, res) => {
    let date = new Date();
    console.log(date);
    res.send('Testing');
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
router.get('/user/getuser', isUserLoggedIn, getUserFromToken);

//College
router.get('/college', getAllColleges);

//Update User Profile:
// router.post("/user/updatedrivelink", isUserLoggedIn, updateDriveLink);
router.post('/user/update/accommodation', isUserLoggedIn, updateAccommodation);

// Team
router.post('/user/team/join', isUserLoggedIn, isVerifiedForRevels, joinTeam);
router.post('/user/team/leave', isUserLoggedIn, isVerifiedForRevels, leaveTeam);

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
router.get('/user/event/getallevents', isUserLoggedIn, getAllEvents);
//Delegate Cards
router.get('/user/delegatecard/getall', getAllDelegateCards);
router.get(
    '/user/delegatecard/getmydelegatecards',
    isUserLoggedIn,
    getMyDelegateCards
);
router.get(
    '/user/delegatecard/getalltransactions',
    isUserLoggedIn,
    getAllMyTransactions
);
// Razorpay - Payment
// TODO : put middleware after testing
router.post('/user/payment', registerOrder);
router.post('/user/payment/verify', verifyPayment);
router.post('/user/payment/onproduction/verify', verifyPaymentAlternate);

//@Category/Admin Routes(Common Login)
router.post('/admin/login', adminLogin); //changed
router.get('/admin/logout', adminLogout);//changed
//Events
router.post('/admin/category/event/add', isAdminLoggedIn,isCategory, addEvent);
router.get('/admin/category/event/getevents', isAdminLoggedIn,isCategory, getCategoryEvent);
router.post('/admin/category/event/update', isAdminLoggedIn,isCategory, updateEvent);
router.post('/admin/category/event/delete', isAdminLoggedIn,isCategory, deleteEvent);

//@Operations Route
router.post(
    '/admin/operations/seteventschedule',
    isAdminLoggedIn,
    isOperations,
    setEventScheldule
);
router.get(
    '/admin/operations/getallevents',
    isAdminLoggedIn,
    isOperations,
    getAllEvents
);

//@SysAdmin Routes - Private Routes for internal use - No frontend needed
router.get('/sysadmin/register/category', isSysAdmin, categoryRegister);  //changed
router.post('/sysadmin/delegatecard/add', isSysAdmin, addDelegateCard);
router.post('/sysadmin/delegatecard/delete', isSysAdmin, deleteDelegateCard);
router.get('/sysadmin/delegatecard/view', isSysAdmin, viewAllDelegateCards);
router.post('/sysadmin/register/admin', isSysAdmin,adminRegister);
router.post('/sysadmin/role/add',addRole)

module.exports = router;
