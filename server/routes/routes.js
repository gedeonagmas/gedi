const express = require("express");
const router = express.Router();
const { authorization } = require("../middleware/authorization");
const { authentication } = require("../middleware/authentication");
const {
  passwordResetValidator,
  changePasswordValidator,
  notificationValidator,
  emailSendValidator,
} = require("../utils/validator");
const { upload } = require("../utils/upload");
const { Gallery } = require("../models/galleryModel");
const { Blog } = require("../models/blogModel");
const { Price } = require("../models/pricingModel");
const { Class } = require("../models/classModel");
const { User } = require("../models/signupModel");

const {
  signupValidator,
  scheduleValidator,
  blogValidator,
  validationHelper,
  priceValidator,
  classValidator,
  updateInfoValidator,
} = require("./../utils/validator");

const {
  signupHandler,
  loginHandler,
  getUsersHandler,
  forgetPassword,
  resetPassword,
  updateProfileInfo,
  updateProfilePicture,
  readProfileInfo,
  updatePassword,
  getMyDataHandler,
} = require("./../controller/userController");

const {
  createSchedule,
  readSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controller/scheduleController");

const {
  create,
  read,
  update,
  deletes,
  updateImage,
  joinHandler,
  classUsersTransactionsHandler,
} = require("../controller/factoryController");

const {
  createTransaction,
  readTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controller/transactionController");
const {
  createNotification,
  readNotification,
  updateNotification,
  deleteNotification,
} = require("../controller/notificationController");
const asyncCatch = require("express-async-catch");
const { sendEmailHandler } = require("../controller/emailHandler");

const files = upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "galleryImage", maxCount: 15 },
  { name: "blogImage", maxCount: 1 },
  { name: "priceImage", maxCount: 1 },
  { name: "classImage", maxCount: 1 },
]);

router
  .route("/signup")
  .post(files, signupValidator, validationHelper("none"), signupHandler);

router.route("/login").post(loginHandler);

router.route("/getAllUsers").get(authentication, getUsersHandler);

router.route("/readMyData").get(authentication, getMyDataHandler);

router.route("/readProfileInfo").get(authentication, readProfileInfo);

router.route("/forgetPassword").post(forgetPassword);

router
  .route("/resetPassword")
  .post(passwordResetValidator, validationHelper("none"), resetPassword);

router
  .route("/updateProfileInfo")
  .patch(
    authentication,
    updateInfoValidator,
    validationHelper("none"),
    updateProfileInfo
  );

router
  .route("/updateProfilePicture")
  .patch(
    authentication,
    files,
    validationHelper("profilePicture"),
    updateProfilePicture
  );

router
  .route("/changePassword")
  .patch(
    authentication,
    changePasswordValidator,
    validationHelper("none"),
    updatePassword
  );

router
  .route("/gallery")
  .post(
    authentication,
    authorization(["admin"]),
    files,
    create(Gallery, "galleryImage")
  )
  .get(read(Gallery))
  .patch(authentication, authorization(["admin"]), update(Gallery, "gallery"))
  .delete(
    authentication,
    authorization(["admin"]),
    deletes(Gallery, "gallery")
  );

router
  .route("/schedule")
  .post(
    authentication,
    authorization("admin"),
    scheduleValidator,
    validationHelper("none"),
    createSchedule
  )
  .get(readSchedule)
  .patch(authentication, authorization(["admin"]), updateSchedule)
  .delete(authentication, authorization(["admin"]), deleteSchedule);

router
  .route("/blog")
  .post(
    authentication,
    authorization("admin"),
    files,
    blogValidator,
    validationHelper("blogImage"),
    create(Blog, "blogImage")
  )
  .get(read(Blog))
  .patch(authentication, authorization(["admin"]), update(Blog, "blog"))
  .put(
    authentication,
    authorization(["admin"]),
    files,
    updateImage(Blog, "blogImage")
  )
  .delete(authentication, authorization(["admin"]), deletes(Blog, "blog"));

router
  .route("/price")
  .post(
    authentication,
    authorization(["admin"]),
    files,
    priceValidator,
    validationHelper("priceImage"),
    create(Price, "priceImage")
  )
  .get(read(Price))
  .patch(authentication, authorization(["admin"]), update(Price, "price"))
  .put(
    authentication,
    authorization(["admin"]),
    files,
    updateImage(Price, "priceImage")
  )
  .delete(authentication, authorization(["admin"]), deletes(Price, "price"));

router
  .route("/class")
  .post(
    authentication,
    authorization(["admin"]),
    files,
    classValidator,
    validationHelper("none"),
    create(Class, "classImage")
  )
  .get(read(Class, "class"))
  .patch(authentication, authorization(["admin"]), update(Class, "class"))
  .put(
    authentication,
    authorization(["admin"]),
    files,
    updateImage(Class, "classImage")
  )
  .delete(authentication, authorization(["admin"]), deletes(Class, "class"));

router
  .route("/user")
  .delete(authentication, authorization(["admin"]), deletes(User));

router
  .route("/transaction")
  .post(authentication, authorization(["user", "admin"]), createTransaction)
  .get(authentication, readTransaction)
  .patch(authentication, authorization(["admin"]), updateTransaction)
  .delete(authentication, authorization(["admin"]), deleteTransaction);

router
  .route("/notification")
  .post(
    authentication,
    notificationValidator,
    validationHelper("none"),
    createNotification
  )
  .get(authentication, readNotification)
  .patch(authentication, updateNotification)
  .delete(authentication, deleteNotification);

router
  .route("/join")
  .post(authentication, authorization(["user"]), joinHandler);

router.route("/trainer").get(async (req, res, next) => {
  res
    .status(200)
    .json({ status: "success", data: await User.find({ role: "trainer" }) });
});

router
  .route("/sendEmail")
  .post(emailSendValidator, validationHelper("none"), sendEmailHandler);

router
  .route("/class-transaction-user")
  .get(authentication, authorization(["admin"]), classUsersTransactionsHandler);

module.exports = router;
