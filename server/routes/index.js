const express = require("express");
const router = express.Router();
const {
  userRegistrationValidation,
  userValidate,
  loginValidation,
} = require("../middleware/validate");
const {
  isUserLoggedIn,
  isVerifiedForRevels,
  isAdminLoggedIn,
} = require("../middleware/auth");
const {
  isCategory,
  isOM,
  isVigilance,
  isOperation,
  isSysAdmin,
  isCulturalCategory,
  isINF,
} = require("../middleware/category");
const {
  hasReadAccess,
  hasReadWriteAccess,
  hasCategorySuperAdminAccess,
  hasSuperAdminAccess,
} = require("../middleware/accessLevel");
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
  updateUser,
} = require("./user/user");
const {
  registerEvent,
  getUserTeams,
  getAllEvents,
  getEventById,
  getEventStatus,
  getEventTags,
  filterEvents,
} = require("./user/event");
const {
  addEvent,
  getCategoryEvent,
  updateEvent,
  deleteEvent,
  getCategory,
  getAllCategories,
  getTeamByCategory
} = require("./admins/category");
const {
  joinTeam,
  leaveTeam,
  addToTeam,
  removeFromTeam,
  getEventTeam,
  deleteTeamRequest,
} = require("./user/team");
const {
  registerOrder,
  verifyPayment,
  verifyPaymentAlternate,
} = require("./user/razorpay");
const {
  addDelegateCard,
  deleteDelegateCard,
  viewAllDelegateCards,
  addRole,
  addCategories,
  registerAdmin,
  addCollege,
  sendEmail,
  getAllRoles,
} = require("./admins/sysAdmin");
const {
  getAllDelegateCards,
  getMyDelegateCards,
  getPendingDelegateCards,
  getAllMyTransactions,
  requestDelegateCard,
  approvedPendingDelegateCard,
} = require("./user/delegateCard");
const { getAllColleges } = require("./user/college");
const { setEventScheldule } = require("./admins/operations");
const {
  adminRegister,
  categoryRegister,
  adminLogin,
  adminLogout,
  getAdminFromToken,
} = require("./admins/auth");
const {
  getUserFromID,
  isEventRegistered,
  hasDelegateCard,
} = require("./admins/vigilance");
const { upload, multipleUpload } = require("../config/aws-s3/multer.config");
const { requestAtom, responseAtom } = require("./user/atom");

//Routes:
router.get(
  "/test",
  isAdminLoggedIn,
  hasCategorySuperAdminAccess,
  (req, res) => {
    let date = new Date();
    // console.log(date);
    res.send("Testing ");
  }
);

//@User Routes:
// Auth:
router.post(
  "/user/register",
  userRegistrationValidation(),
  userValidate,
  userRegister
);
router.post("/user/login", loginValidation(), userValidate, userLogin);
router.get("/user/logout", userLogout);
router.post("/user/update", isUserLoggedIn, multipleUpload, updateUser);
router.get("/user/verify/:token", userEmailVerify);
router.post("/user/resendlink", resendVerificationLink);
router.post("/user/forgetpass/", userPassResetLink);
router.post("/user/forgetpass/verify", userPassResetVerify);
router.get("/user/getuser", isUserLoggedIn, getUserFromToken);
router.get("/admin/getadmin", isAdminLoggedIn, getAdminFromToken);
//College
router.get("/colleges", getAllColleges);

//Update User Profile:
// router.post("/user/updatedrivelink", isUserLoggedIn, updateDriveLink);
router.post("/user/update/accommodation", isUserLoggedIn, updateAccommodation);

// Team
router.post("/user/team/join", isUserLoggedIn, isVerifiedForRevels, joinTeam);
router.post("/user/team/leave", isUserLoggedIn, isVerifiedForRevels, leaveTeam);
router.post("/user/team/add", isUserLoggedIn, isVerifiedForRevels, addToTeam);
router.post(
  "/user/team/remove",
  isUserLoggedIn,
  isVerifiedForRevels,
  removeFromTeam
);
router.post(
  "/user/team/get",
  isUserLoggedIn,
  isVerifiedForRevels,
  getEventTeam
);
router.post(
  "/user/team/deleterequest",
  isUserLoggedIn,
  isVerifiedForRevels,
  deleteTeamRequest
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
  getUserTeams
);
router.get("/user/event/getallevents", getAllEvents);
router.post("/user/event/getbyid", getEventById);
router.post("/user/event/gettags", getEventTags);
router.post("/user/event/getstatus", isUserLoggedIn, getEventStatus);
router.post("/user/event/filter", filterEvents);
//Delegate Cards
router.get("/user/delegatecard/getall", getAllDelegateCards);
router.get(
  "/user/delegatecard/getmydelegatecards",
  isUserLoggedIn,
  getMyDelegateCards
);
router.get(
  "/user/delegatecard/getpendingdelegatecards",
  isAdminLoggedIn,
  getPendingDelegateCards
);
router.get(
  "/user/delegatecard/getalltransactions",
  isUserLoggedIn,
  getAllMyTransactions
);
// Razorpay - Payment
// TODO : put middleware after testing
router.post("/Atom", requestAtom);
router.post("/Response", responseAtom);

router.post("/user/payment/cash", isUserLoggedIn, requestDelegateCard);
// @INF Route for cash payment verification
router.post(
  "/user/payment/approve",
  isAdminLoggedIn,
  isINF,
  hasCategorySuperAdminAccess,
  approvedPendingDelegateCard
);
router.post("/user/payment", isUserLoggedIn, registerOrder);
router.post("/user/payment/verify", isUserLoggedIn, verifyPayment);
router.post("/user/payment/onproduction/verify", verifyPaymentAlternate);

//@Category/Admin Routes(Common Login)
router.post("/admin/login", adminLogin); //changed
router.get("/admin/logout", adminLogout); //changed
//Events
router.post("/admin/category/event/add", isAdminLoggedIn, addEvent);
router.get(
  "/admin/category/event/getevents",
  isAdminLoggedIn,
  getCategoryEvent
);
router.get("/admin/category", isAdminLoggedIn, getCategory);
router.post("/admin/category/event/update", isAdminLoggedIn, updateEvent);
router.post("/admin/category/event/delete", isAdminLoggedIn, deleteEvent);
router.get("/category/getall", getAllCategories);
// router.post("/category/getteams",getTeamByCategory)

//@Operations Route
router.post(
  "/admin/operations/seteventschedule",
  // isAdminLoggedIn,
  // isOperations,
  setEventScheldule
);
router.get(
  "/admin/operations/getallevents",
  isAdminLoggedIn,
  // isOperations,
  getAllEvents
);

// @Vigilance Routes
router.post("/admin/vigilance/user", getUserFromID);
router.post("/admin/vigilance/user/event", isEventRegistered);
router.post("/admin/vigilance/user/delegatecard", hasDelegateCard);

// // --------------------------INTERNAL ROUTES-----------------------------------
// //@SysAdmin Routes - Private Routes for internal use - No frontend needed
// // router.get('/sysadmin/register/category', categoryRegister);  //changed
// router.post('/sysadmin/delegatecard/add', addDelegateCard);
// router.post('/sysadmin/delegatecard/delete', deleteDelegateCard);
// router.get('/sysadmin/delegatecard/view', viewAllDelegateCards);
// // router.post('/sysadmin/register/admin', isSysAdmin,adminRegister);
// router.post('/sysadmin/role/add', addRole);
// router.post('/sysadmin/category/add', addCategories);
// router.post('/sysadmin/admin/register', registerAdmin);
// router.post('/sysadmin/college/add', addCollege);
// router.post('/sysadmin/sendemail', sendEmail);
// router.get('/sysadmin/role/getall',getAllRoles)

module.exports = router;
