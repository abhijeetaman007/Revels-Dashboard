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
  updateDriveLink,
} = require("./userRoutes/user");
const {
  registerEvent,
  getUserEvents,
  getAllEvents,
} = require("./userRoutes/event");
const {
  categoryRegister,
  categoryLogin,
  categoryLogout,
} = require("../routes/adminRoutes/category");
const {
  addEvent,
  getCategoryEvent,
  updateEvent,
  deleteEvent,
} = require("../routes/adminRoutes/events");
const {
  teamRegister,
  joinTeam,
  leaveTeam,
} = require("../routes/userRoutes/team");
const {
  registerOrder,
  verifyPayment,
  verifyPaymentAlternate,
} = require("../routes/userRoutes/razorpay");
const {
  addDelegateCard,
  deleteDelegateCard,
  viewAllDelegateCards,
} = require("../routes/sysAdminRoutes/delegateCard");
const {
  getAllDelegateCards,
  getMyDelegateCards,
  getAllMyTransactions,
} = require("../routes/userRoutes/delegateCard");

//Routes:
router.get("/test", (req, res) => {
  console.log("DateTime: ", new Date());
  res.send("Testing Route");
});

//@User Routes:
// Auth:
router.post(
  "/user/register",
  userRegistrationValidation(),
  userValidate,
  userRegister
); //checked
router.post(
  "/user/login",
  loginValidation(),
  userValidate,
  isEmailVerified,
  userLogin
); //checked
router.get("/user/logout", userLogout);
router.get("/user/verify/:token", userEmailVerify);
router.post("/user/resendlink", resendVerificationLink);
router.post("/user/forgetpass/", userPassResetLink);
router.post("/user/forgetpass/verify", userPassResetVerify);
//Update User Profile:
router.post("/user/updatedrivelink", isUserLoggedIn, updateDriveLink);

//Team:
router.post(
  "/user/team/register",
  isUserLoggedIn,
  isVerifiedForRevels,
  teamRegister
); //checked
router.post(
  "/user/team/jointeam",
  isUserLoggedIn,
  isVerifiedForRevels,
  joinTeam
); //checked
router.post(
  "/user/team/leaveteam",
  isUserLoggedIn,
  isVerifiedForRevels,
  leaveTeam
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
router.get("/user/delegatecard/getall", getAllDelegateCards);
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
router.post("/user/payment", registerOrder);
router.post("/user/payment/verify", verifyPayment);
router.post("/user/payment/onproduction/verify", verifyPaymentAlternate);

//@Admin Routes :
//Category Routes
router.get("/category/register", categoryRegister); //checked
router.post("/category/login", categoryLogin); //checked
router.get("/category/logout", categoryLogout);
//Events
router.post("/category/event/add", isCategoryLoggedIn, addEvent); //checked
router.get("/category/event/getevents", isCategoryLoggedIn, getCategoryEvent); //checked
router.post("/category/event/update", isCategoryLoggedIn, updateEvent);
router.post("/category/event/delete", isCategoryLoggedIn, deleteEvent);

//@SysAdmin Routes - Private Routes for internal use
router.post("/sysadmin/delegatecard/add", isSysAdmin, addDelegateCard);
router.post("/sysadmin/delegatecard/delete", deleteDelegateCard);
router.get("/sysadmin/delegatecard/view", viewAllDelegateCards);

module.exports = router;
