const asyncCatch = require("express-async-catch");
const { Transaction } = require("../models/transactionModel");
const AppError = require("../utils/AppError");
const { User } = require("../models/signupModel");

exports.createTransaction = asyncCatch(async (req, res, next) => {
  const { classId, userId, amount, title } = req.body;
  const userData = await User.findOne({ _id: userId });
  userData?.class?.map((u) => {
    if (u.class.toString() === classId) {
      u.class = u.class;
      u.status = "Payed";
      u.amount = amount;
      u.paymentMethod = "Chappa";
      u._id = u._id;
    }
  });
  const data = await Transaction.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    userName: userData.userName,
    email: userData.email,
    phone: userData.phone,
    city: userData.city,
    profilePicture: userData.profilePicture,
    class: title,
    date: Date.now(),
    price: amount,
    method: "Chappa",
    status: "Payed",
  });
  await userData.save();
  return res.status(200).json({
    status: "Payed",
    message: "Payment successful",
    data,
  });
});

exports.readTransaction = asyncCatch(async (req, res, next) => {
  let param = req.query.id ? { _id: req.query.id } : {};
  const data = await Transaction.find(param).sort("-date");

  res.status(200).json({
    status: "Read",
    length: data.length,
    data,
  });
});

exports.updateTransaction = asyncCatch(async (req, res, next) => {
  const data = await Transaction.findByIdAndUpdate(req.query.id, {
    $set: { ...req.body },
  });

  if (!data)
    return next(new AppError("Error unable to update transaction", 400));

  res.status(200).json({
    status: "Updated",
    message: "transaction updated successfully",
  });
});

exports.deleteTransaction = asyncCatch(async (req, res, next) => {
  const data = await Transaction.findByIdAndDelete(req.query.id);

  if (!data)
    return next(new AppError("Error unable to update transaction", 400));

  res.status(200).json({
    status: "Deleted",
    message: "transaction Deleted successfully",
    data,
  });
});
