const AppError = require("../utils/AppError");
const asyncCatch = require("express-async-catch");
const { User } = require("./../models/signupModel");
const { tokenGenerator } = require("../utils/tokenGenerator");
const crypto = require("crypto");
const { Class } = require("../models/classModel");
const { upload } = require("./../utils/upload");
const cloudinary = require("./../config/cloudinary");

exports.signupHandler = asyncCatch(async (req, res, next) => {
  if (req.files.profilePicture === undefined) {
    const data = await User.create({
      ...req.body,
    });
    const token = tokenGenerator(res, data._id);
    return res
      .status(200)
      .json({ message: "Account Created Successfully", token, data });
  }
  cloudinary.uploader.upload(
    req.files.profilePicture[0].path,
    async function (err, result) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "something went wrong account not created" });
      }
      const data = await User.create({
        ...req.body,
        profilePicture: result.url,
      });
      const token = tokenGenerator(res, data._id);
      return res
        .status(200)
        .json({ message: "Account Created Successfully", token, data });
    }
  );
});

exports.loginHandler = asyncCatch(async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password)
    return next(new AppError("provide email and password", 404));
  const user = await User.findOne({ userName }).select("+password");
  if (!user)
    return next(
      new AppError(
        "there is no user found by this user name please register first",
        404
      )
    );

  const isPasswordCorrect = await user.passwordCheck(user.password, password);
  if (!isPasswordCorrect)
    return next(new AppError("Invalid user name or password", 404));
  const token = tokenGenerator(res, user._id);

  res.status(200).json({
    status: "success",
    message: "you are logged in successfully",
    data: user,
    token,
  });
});

exports.forgetPassword = asyncCatch(async (req, res, next) => {
  const { email } = req.body;
  if (!email)
    return next(new AppError("please provide your email address", 404));
  const user = await User.findOne({ email });
  if (!user)
    return next(new AppError("There is no email registered by this email"));

  const resetTokenUrl = await user.createResetToken();
  await user.save({ validateBeforeSave: false });
  const passwordResetUrl = `${req.protocol}:/${req.originalUrl}/${resetTokenUrl}`; // this url will sent via email
  //email sent logic here
  try {
    await sendEmail({
      from: "alphaalpha@gmail.com",
      email: user.email,
      subject: "reset your password",
      message: "verify your email to reset your password",
      html: `<div>this is your verification link click <a style={{background:'#00aeff',color:white,padding:10px;}} href="${passwordResetUrl}">here</a> to reset your password</div>`,
    });
    return res.status(200).json({
      status: "success",
      message:
        "We have just sent a verification link via your email address please check. it's valid only for 10 minutes",
      passwordResetUrl,
    });
  } catch (err) {
    console.log(err);
    user.resetTokenExpires = undefined;
    user.resetToken = undefined;
    user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "something went wrong Unable to send the email please try again",
        500
      )
    );
  }
});

exports.resetPassword = asyncCatch(async (req, res, next) => {
  const resetToken = await crypto
    .createHash("sha256")
    .update(req.query.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetToken,
  }).select("+password");

  if (!user) return next(new AppError("Invalid Token", 404));

  const isTokenExpired = await user.isTokenExpired();
  if (isTokenExpired) return next(new AppError("Token Expired", 404));

  user.password = req.body.password;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  user.save({ validateBeforeSave: true });

  const token = tokenGenerator(res, user._id);

  res.status(201).json({
    status: "success",
    message: "Your password changed successfully",
    token,
  });
});

exports.readProfileInfo = asyncCatch(async (req, res, next) => {
  res.status(200).json({
    status: "READ",
    data: req.user,
  });
});

exports.updateProfileInfo = asyncCatch(async (req, res, next) => {
  const body = { ...req.body };
  body.role && delete body["role"];
  body.password && delete body["password"];
  const data = await User.findByIdAndUpdate(req.query.id, {
    $set: { ...body },
  });

  if (!data)
    return next(new AppError("Error unable to update the profile", 404));

  res
    .status(200)
    .json({ status: "Updated", message: "Profile updated successfully", data });
});

exports.updateProfilePicture = asyncCatch(async (req, res, next) => {
  if (!req.files || !req.files.profilePicture)
    return next(new AppError(["please select your new profile picture"], 404));

  cloudinary.uploader.upload(
    req.files.profilePicture[0].path,
    async function (err, result) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "something went wrong profile not updated" });
      }

      const data = await User.findByIdAndUpdate(req.body.id, {
        $set: { profilePicture: result.url },
      });

      if (!data)
        return next(new AppError("Error unable to update the profile", 404));

      return res.status(200).json({
        status: "Updated",
        message: "Profile updated successfully",
        data,
      });
    }
  );
});

exports.updatePassword = asyncCatch(async (req, res, next) => {
  const body = { ...req.body };
  body.role && delete body["role"];

  const user = await User.findOne({ _id: body.id }).select("+password");

  user.password = body.newPassword;
  await user.save();

  res
    .status(200)
    .json({ status: "Changed", message: "Password changed successfully" });
});

exports.getUsersHandler = asyncCatch(async (req, res, next) => {
  const data = await User.find().sort("-createdAt");
  res.status(200).json({ status: "success", length: data.length, data });
});

exports.getMyDataHandler = asyncCatch(async (req, res, next) => {
  const data = await User.findOne({ _id: req.query.id });
  const cla = data.class.map(async (c) => Class.findById(c.class));

  const cc = await Promise.all(cla);
  res.status(200).json({ status: "Read", data, class: cc });
});
