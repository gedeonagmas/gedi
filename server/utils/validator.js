const { body, validationResult } = require("express-validator");
const { User } = require("../models/signupModel");
const fs = require("fs");
const { Class } = require("../models/classModel");
const bcrypt = require("bcrypt");

//for character like first name with out space eg. abebe
const onlyCharacter = (field, min, max, allowSpace) => {
  return body(field)
    .isLength({ min })
    .withMessage(`${field} must be greater than ${min - 1} character`)
    .isLength({ max })
    .withMessage(`${field} must be less than ${max} character`)
    .isAlpha("en-US", { ignore: allowSpace ? " " : "" })
    .withMessage(`${field} must contains only character`);
};

const alphaNumeric = (field, min, max) => {
  return body(field)
    .isLength({ min })
    .withMessage(`${field} must be greater than ${min - 1} character`)
    .isLength({ max })
    .withMessage(`${field} must be less than ${max} character`);
};

const numeric = (field, min) => {
  return body(field)
    .isLength({ min })
    .withMessage(`${field} must have a value`);
};

const password = (filed) => {
  return body(filed)
    .isLength({ min: 8 })
    .withMessage("minimum password length is 8")
    .isLength({ max: 16 })
    .withMessage("maximum password length is 16")
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage(
      "password must contains at least 1 number, 1 # capital letter, 1 small letter, 1 special character"
    );
};

const confirmPassword = (field) => {
  return body(field).custom((val, { req }) => {
    if (req.body.password !== val) throw new Error("password not much");
    return true;
  });
};

const currentPassword = (field) => {
  return body(field).custom(async (val, { req }) => {
    const user = await User.findById(req.user._id).select("+password");
    if (!(await bcrypt.compare(val, user.password)))
      throw new Error("Your current password is Incorrect");
    return true;
  });
};

const confirmPasswordChange = (field) => {
  return body(field).custom((val, { req }) => {
    if (req.body.newPassword !== val) throw new Error("password not much");
    return true;
  });
};

const emailUpdate = (field, model) => {
  return body(field)
    .isEmail()
    .withMessage(`invalid email`)
    .custom(async (val, { req }) => {
      const data = await model.find({ email: req.body.email });
      if (data?.length > 0 && req.query.id !== data[0]?.id)
        throw new Error(
          `this email is already registered try with different email`
        );
      return true;
    });
};

const fileValidator = (field) => {
  return body(field).custom(async function (val, { req }) {
    if (!req.files || !req.files[field]) {
      // fs.unlink(`${req.files[field][0].path}`, (err) => err);
      throw new Error(`${field} is required`);
    }
    return true;
  });
};

const userNameUpdate = (field, model) => {
  return body(field)
    .isAlphanumeric()
    .withMessage("in user name space is not allowed")
    .isLength({ max: 30 })
    .withMessage("maximum user name length is 30")
    .isLength({ min: 3 })
    .withMessage("user name must be greater than 2 character")
    .custom(async (val, { req }) => {
      const data = await model.find({ userName: req.body.userName });
      if (data?.length > 0 && req.query.id !== data[0]?.id)
        throw new Error(
          `this user name is already taken try with different one`
        );
      return true;
    });
};

const email = (field, model) => {
  return body(field)
    .isEmail()
    .withMessage(`invalid email`)
    .custom(async (val, { req }) => {
      const data = await model.find({ email: req.body.email });
      if (data.length !== 0)
        throw new Error(
          `this email is already registered try with different email`
        );
      return true;
    });
};

const amount = (field) => {
  return body(field).custom(function (val, { req }) {
    if (!req.body.amount || req.body.amount * 1 < 0) {
      throw new Error("amount value must be greater than 0");
    }
    return true;
  });
};

const notification = (field) => {
  return body(field).custom((val, { req }) => {
    if (req.body.receiver?.length < 2)
      throw new Error("please select at least one receiver");
    return true;
  });
};

const userName = (filed, model) => {
  return body(filed)
    .isAlphanumeric()
    .withMessage("in user name space is not allowed")
    .isLength({ max: 30 })
    .withMessage("maximum user name length is 30")
    .isLength({ min: 3 })
    .withMessage("user name must be greater than 2 character")
    .custom(async (val, { req }) => {
      const data = await model.find({ userName: req.body.userName });
      if (data.length !== 0)
        throw new Error(
          `this user name is already taken try with different one`
        );
      return true;
    });
};

const onlyEmail = (field) => {
  return body(field)
    .isEmail()
    .withMessage(`Invalid email please use the valid one`);
};

exports.emailSendValidator = [
  onlyCharacter("fullName", 3, 100, true),
  onlyEmail("email"),
  alphaNumeric("description", 3, 500),
];

exports.signupValidator = [
  onlyCharacter("firstName", 4, 100, false),
  onlyCharacter("lastName", 4, 100, false),
  onlyCharacter("city", 4, 100, true),
  email("email", User),
  userName("userName", User),
  numeric("phone", 6),
  password("password"),
  confirmPassword("confirmPassword"),
];

exports.scheduleValidator = [
  numeric("class", 3),
  numeric("trainer", 3),
  alphaNumeric("startTime", 3, 100),
  alphaNumeric("finishTime", 3, 100),
  onlyCharacter("day", 3, 100, false),
];

exports.blogValidator = [
  alphaNumeric("title", 5, 120),
  alphaNumeric("owner", 3, 40),
  alphaNumeric("date", 3, 100),
  onlyCharacter("category", 3, 100, true),
  alphaNumeric("description", 100, 800),
];

exports.priceValidator = [
  alphaNumeric("title", 5, 80),
  numeric("price", 1),
  numeric("services", 1),
  fileValidator("priceImage"),
];

exports.updateInfoValidator = [
  onlyCharacter("firstName", 4, 100, false),
  onlyCharacter("lastName", 4, 100, false),
  onlyCharacter("city", 4, 100, true),
  emailUpdate("email", User),
  userNameUpdate("userName", User),
  numeric("phone", 6),
];

exports.passwordResetValidator = [
  password("password"),
  confirmPassword("confirmPassword"),
];

exports.changePasswordValidator = [
  currentPassword("currentPassword"),
  password("newPassword"),
  confirmPasswordChange("confirmPassword"),
];

exports.classValidator = [
  fileValidator("classImage"),
  alphaNumeric("title", 3, 80),
  alphaNumeric("trainer", 3, 100),
  alphaNumeric("difficulty", 3, 100),
  amount("amount"),
];

exports.notificationValidator = [
  alphaNumeric("description", 3, 1200),
  notification("receiver"),
];

exports.validationHelper = (type) => (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mes = errors.array().map((err) => err.msg);
    // fs.unlink(`${req.files[type][0].path}`, (err) => err);
    return res.status(400).json({ message: mes.join("**") });
  }
  next();
};

// .isAlpha("en-US", { ignore: " " }) for allowing space
