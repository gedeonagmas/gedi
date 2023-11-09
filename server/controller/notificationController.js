const asyncCatch = require("express-async-catch");
const { Notification } = require("./../models/notificationModel");

exports.createNotification = asyncCatch(async (req, res, next) => {
  const data = await Notification.create(req.body);

  res.status(200).json({
    status: "Created",
    message: "notification created successfully",
    data,
  });
});

exports.readNotification = asyncCatch(async (req, res, next) => {
  const data = Notification.find().sort("-date");
  const value =
    req.query.type === "admin"
      ? data.populate("receiver sender")
      : data.populate("sender");

  const val = await value;
  res.status(200).json({
    status: "Read",
    size: val?.length,
    data: val,
  });
});

exports.updateNotification = asyncCatch(async (req, res, next) => {
  const data = await Notification.findOne({ _id: req.query.id });

  data.receiver = [
    ...data.receiver.filter((e) => e.toString() !== req.query.userId),
  ];

  await data.save();
  res.status(200).json({
    status: "Updated",
    message: "notification Deleted successfully",
    data,
  });
});

exports.deleteNotification = asyncCatch(async (req, res, next) => {
  const data = await Notification.findByIdAndDelete(req.query.id);

  res.status(200).json({
    status: "Deleted",
    message: "notification deleted successfully",
    data,
  });
});
