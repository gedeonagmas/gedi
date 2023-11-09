const asyncCatch = require("express-async-catch");
const AppError = require("../utils/AppError");
const { Schedule } = require("./../models/scheduleModel");

exports.createSchedule = asyncCatch(async (req, res, next) => {
  const data = await Schedule.create(req.body);

  res.status(201).json({
    status: "Created",
    message: "schedule created successfully",
    data,
  });
});

exports.readSchedule = asyncCatch(async (req, res, next) => {
  const data = req.query.day
    ? await Schedule.find({ day: req.query.day })
        .populate("class trainer")
        .sort("-createdAt")
    : req.query.trainer
    ? await Schedule.find({ trainer: req.query.trainer })
        .populate("class")
        .sort("-createdAt")
    : await Schedule.find().populate("class trainer").sort("-createdAt");

  res.status(200).json({
    status: "Fetched",
    length: data.length,
    data,
  });
});

exports.updateSchedule = asyncCatch(async (req, res, next) => {
  const data = await Schedule.findByIdAndUpdate(req.query.id, {
    $set: req.body,
  });

  if (!data)
    return next(new AppError("Error unable to update the schedule", 404));

  res
    .status(201)
    .json({ status: "Updated", message: "schedule updated successfully" });
});

exports.deleteSchedule = asyncCatch(async (req, res, next) => {
  const data = await Schedule.findByIdAndDelete(req.query.id);

  if (!data)
    return next(new AppError("Error unable to delete the schedule", 404));

  res
    .status(201)
    .json({ status: "Deleted", message: "schedule deleted successfully" });
});
