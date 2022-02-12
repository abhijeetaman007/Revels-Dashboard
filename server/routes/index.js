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
const { addEvent, getCategoryEvent,updateEvent,deleteEvent } = require('../routes/adminRoutes/events');
const {
    teamRegister,
    joinTeam,
    leaveTeam,
} = require('../routes/userRoutes/team');

//Routes:
router.get('/test', (req, res) => {

    // let obj = {
        // eventID:1001
    // }
    // let url = qrcode.toDataURL((obj, function (err, url) {
        // if(err) return console.log(err)
        // console.log(url)
    //   }))
    // console.log(url) 
    // const input_text = "TEST";
    // qrcode.toDataURL(input_text, (err, src) => {
    // if (err) res.send("Something went wrong!!");
    // res.send({
    //   qr_code: src,
    // });
//   });
console.log('DateTime: ',new Date())



    // var d1 = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    // console.log(d1)
    // d1 = new Date(d1)
    // if(typeof d1 === 'object' && d1 !== null && 'getDate' in d1)
    // {
        // console.log("here")
        // console.log(d1.getDate())
    // }

    // const date = new Date();
    // console.log("current Time", date);
    // offset = (60*5+30)*60*1000;
    // var T1 = new Date(date.getTime()+offset);
    // var T2 = new Date(date.getTime()+(60*6+30)*60*1000);
    // console.log(T1)
    // console.log(T2)
    // console.log(T2-T1)
    // let str = ''
    // console.log(!!str)

    res.send('Testing Route');
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
router.post('/category/event/add',isCategoryLoggedIn, addEvent);
router.get('/category/event/getevents',isCategoryLoggedIn, getCategoryEvent);
router.post('/category/event/update',isCategoryLoggedIn,updateEvent)
router.post('/category/event/delete',isCategoryLoggedIn,deleteEvent)



module.exports = router;
