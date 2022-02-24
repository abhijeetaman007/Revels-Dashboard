const express = require("express");
const router = express.Router();
const {
  userRegistrationValidation,
  userValidate,
  loginValidation,
} = require("../middleware/validate");
const {
  isUserLoggedIn,
  isEmailVerified,
  isVerifiedForRevels,
} = require("../middleware/userAuth");
const { isCategoryLoggedIn } = require("../middleware/categoryAuth");
const { isSysAdmin } = require("../middleware/sysAdminAuth");
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
} = require("./user/user");
const { registerEvent, getUserEvents, getAllEvents } = require("./user/event");
const {
  categoryRegister,
  categoryLogin,
  categoryLogout,
} = require("./category/category");
const {
  addEvent,
  getCategoryEvent,
  updateEvent,
  deleteEvent,
} = require("./category/events");
const { joinTeam } = require("./user/team");
const {
  registerOrder,
  verifyPayment,
  verifyPaymentAlternate,
} = require("./user/razorpay");
const {
  addDelegateCard,
  deleteDelegateCard,
  viewAllDelegateCards,
} = require("./sysAdmin/delegateCard");
const {
  getAllDelegateCards,
  getMyDelegateCards,
  getAllMyTransactions,
} = require("./user/delegateCard");
const {
  getAllColleges 
} = require("./user/college")

//Routes:
router.get("/test", (req, res) => {
  let date = new Date()
  console.log(date)
  res.send("Testing");
});

//@User Routes:
// Auth:
router.post(
  "/user/register",
  userRegistrationValidation(),
  userValidate,
  userRegister
); 
router.post(
  "/user/login",
  loginValidation(),
  userValidate,
  isEmailVerified,
  userLogin
); 
router.get("/user/logout", userLogout);
router.get("/user/verify/:token", userEmailVerify);
router.post("/user/resendlink", resendVerificationLink);
router.post("/user/forgetpass/", userPassResetLink);
router.post("/user/forgetpass/verify", userPassResetVerify);
router.get("/user/getuser", isUserLoggedIn, getUserFromToken);

//College
router.get("/college",getAllColleges) 

//Update User Profile:
// router.post("/user/updatedrivelink", isUserLoggedIn, updateDriveLink);
router.post("/user/updateaccommodation", isUserLoggedIn, updateAccommodation);

// Team 
router.post(
  "/user/team/jointeam",
  isUserLoggedIn,
  isVerifiedForRevels,
  joinTeam
); 

//Events:
router.post(
  "/user/event/register",
  isUserLoggedIn,
  isVerifiedForRevels,
  registerEvent
);
router.get(
  "/user/event/getevents",
  isUserLoggedIn,
  isVerifiedForRevels,
  getUserEvents
);
router.get("/user/event/getallevents", isUserLoggedIn, getAllEvents);
//Delegate Cards
router.get("/user/delegatecard/getall", isUserLoggedIn, getAllDelegateCards); 
router.get(
  "/user/delegatecard/getmydelegatecards",
  isUserLoggedIn,
  getMyDelegateCards
);
router.get(
  "/user/delegatecard/getalltransactions",
  isUserLoggedIn,
  getAllMyTransactions
);
// Razorpay - Payment
// TODO : put middleware
router.post("/user/payment", isUserLoggedIn, registerOrder);
router.post("/user/payment/verify", isUserLoggedIn, verifyPayment);
router.post("/user/payment/onproduction/verify", verifyPaymentAlternate);

//@Admin Routes :
//Category Routes
router.post("/category/login", categoryLogin); 
router.get("/category/logout", categoryLogout); 
//Events
router.post("/category/event/add", isCategoryLoggedIn, addEvent); 
router.get("/category/event/getevents", isCategoryLoggedIn, getCategoryEvent); 
router.post("/category/event/update", isCategoryLoggedIn, updateEvent); 
router.post("/category/event/delete", isCategoryLoggedIn, deleteEvent); 

//@SysAdmin Routes - Private Routes for internal use
router.get("/category/register",isSysAdmin, categoryRegister); 
router.post("/sysadmin/delegatecard/add", isSysAdmin, addDelegateCard);
router.post("/sysadmin/delegatecard/delete", isSysAdmin, deleteDelegateCard);
router.get("/sysadmin/delegatecard/view", isSysAdmin, viewAllDelegateCards);

module.exports = router;
