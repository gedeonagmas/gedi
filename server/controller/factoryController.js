const AppError = require("../utils/AppError");
const asyncCatch = require("express-async-catch");
const { size } = require("../utils/size");
const { Class } = require("../models/classModel");
const { User } = require("../models/signupModel");
const { Transaction } = require("../models/transactionModel");
const { upload } = require("./../utils/upload");
const cloudinary = require("./../config/cloudinary");

exports.create = (model, image) =>
  asyncCatch(async (req, res, next) => {
    if (image === "galleryImage") {
      if (!req.files || !req.files[image]) {
        return next(
          new AppError("you must select at least 1 gallery image", 400)
        );
      } else if (req.files[image]) {
        req.files[image].map(async (gallery) => {
          cloudinary.uploader.upload(
            gallery.path,
            async function (err, result) {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  message: "something went wrong gallery not created",
                });
              }
              const data = await model.create({
                owner: req.user.role,
                image: result.url,
                size: size(gallery.size),
                createdAt: req.body.createdAt,
              });
              return res.status(201).json({
                status: "Created",
                message: "gallery created successfully",
                data: data,
              });
            }
          );
        });
      }
    } else if (image !== "galleryImage") {
      cloudinary.uploader.upload(
        req.files[image][0].path,
        async function (err, result) {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ msg: "something went wrong document not created" });
          }
          const data = await model.create({
            ...req.body,
            image: result.url,
          });
          return res.status(201).json({
            status: "Created",
            message: "document created successfully",
            data,
          });
        }
      );
    }
  });

exports.read = (model, type) =>
  asyncCatch(async (req, res, next) => {
    const total = await model.find({ visible: true });
    const params = { ...req.query };
    const remove = ["sort", "page", "limit", "type"];
    remove.forEach((el) => delete params[el]);

    const filter = JSON.parse(
      JSON.stringify(params).replace(
        /\b(gte|lte|lt|gt|eq|neq)\b/g,
        (match) => `$${match}`
      )
    );

    const tempData = model.find(filter);
    req.query.sort
      ? tempData.sort(req.query.sort.split(",").join(" "))
      : tempData.sort("-createdAt");

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || null;
    const skip = (page - 1) * limit;
    tempData.skip(skip).limit(limit);

    if (type === "class") {
      //add &&req.query.type==='trainer' for trainer
      tempData.populate("trainer");
    }

    if (req.query.type === "trainer") {
      tempData.populate("members");
    }

    const data = await tempData;

    if (page) {
      const dd = await model.countDocuments();
      if (skip >= dd)
        return next(new AppError("you are in the last page", 404));
    }
    if (data.length < 1)
      return next(new AppError("There is no data to display", 400));

    res.status(200).json({
      status: "success",
      length: data.length,
      total: total.length,
      data: data,
    });
  });

exports.update = (model, type) =>
  asyncCatch(async (req, res, next) => {
    const lengths = await model.find({ visible: true }).countDocuments();
    if (type === "class" && lengths < 7) {
      return next(
        new AppError(
          "You can't hide the class, there must be at least 6 visible class"
        )
      );
    }

    if (type === "gallery" && lengths < 6) {
      return next(
        new AppError(
          "You can't hide the gallery, there must be at least 5 visible gallery"
        )
      );
    }

    if (type === "blog" && lengths < 4) {
      return next(
        new AppError(
          "You can't hide the blog, there must be at least 3 visible blog"
        )
      );
    }

    if (type === "price" && lengths < 4) {
      return next(
        new AppError(
          "You can't hide the price, there must be at least 3 visible price"
        )
      );
    }
    const data = await model.findByIdAndUpdate(req.query.id, {
      $set: { ...req.body },
    });

    if (!data)
      return next(new AppError("Error unable to update the document", 404));

    res
      .status(201)
      .json({ status: "Updated", message: "document updated successfully" });
  });

exports.updateImage = (model, image) =>
  asyncCatch(async (req, res, next) => {
    if (!req.files || !req.files[image])
      return next(new AppError("image is required", 404));

    const data = await model.findByIdAndUpdate(req.query.id, {
      $set: { image: req.files[image][0].filename },
    });

    if (!data)
      return next(new AppError("Error unable to update the document", 404));

    res
      .status(201)
      .json({ status: "Updated", message: "document updated successfully" });
  });

exports.deletes = (model, type) =>
  asyncCatch(async (req, res, next) => {
    const lengths = await model.find().countDocuments();
    if (type === "class" && lengths < 7) {
      return next(
        new AppError(
          "You can't delete the class, there must be at least 6 class"
        )
      );
    }

    if (type === "gallery" && lengths < 6) {
      return next(
        new AppError(
          "You can't delete the gallery, there must be at least 5 gallery"
        )
      );
    }

    if (type === "blog" && lengths < 4) {
      return next(
        new AppError("You can't delete the blog, there must be at least 3 blog")
      );
    }

    if (type === "price" && lengths < 4) {
      return next(
        new AppError(
          "You can't delete the price, there must be at least 3 price"
        )
      );
    }

    const data = await model.findByIdAndDelete(req.query.id);

    if (!data)
      return next(new AppError("Error unable to delete the document", 404));

    res
      .status(201)
      .json({ status: "Deleted", message: "document deleted successfully" });
  });

exports.joinHandler = asyncCatch(async (req, res, next) => {
  const classData = await Class.findOne({ _id: req.query.id });
  const userData = await User.findOne({ _id: req.user._id });
  if (!classData)
    return next(
      new AppError("This class is not available please visit us later", 404)
    );

  if (!userData)
    return next(new AppError("users not found please try again ", 404));

  const result = classData.members.map((m) => {
    if (m.toString() === req.user._id.toString()) {
      return false;
    }
    return true;
  });

  if (result.includes(false))
    return next(new AppError("you are already joined to this class", 404));

  classData.members = [...classData.members, req.user._id];
  userData.class = [
    ...userData.class,
    {
      class: req.query.id,
    },
  ];

  await classData.save();
  await userData.save();

  res.status(200).json({
    status: "Joined",
    message: "you are joined to this class successfully",
  });
});

exports.classUsersTransactionsHandler = asyncCatch(async (req, res, next) => {
  const classes = await Class.find().countDocuments();
  const users = await User.find({ role: "user" }).countDocuments();
  const trainers = await User.find({ role: "trainer" }).countDocuments();
  const transactions = await Transaction.find().countDocuments();

  res.status(200).json({ classes, users, trainers, transactions });
});
