// let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");
const validSchema = require("../middlewares/validationSchema");
const Course = require("../models/course.model");
const httpStatus = require("../utils/CONSTANT");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");

// variables

const getCourses = async (req, res) => {
  const query = req.query;

  const limit = query.limit || 2;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatus.SUCCESS, data: {NumOFCourses :courses.length, page, courses } });
};

const getCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId, { __v: false });
  if (!course) {
    const error = appError.create("course not found", 404, httpStatus.FAIL);
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data: { course: course } });
});

const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }

  const newCourse = new Course(req.body);
  await newCourse.save();

  res.status(201).json({ status: httpStatus.SUCCESS, data: { newCourse } });
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  // const updatedCourse = await Course.updateOne(
  //   { _id: courseId },
  //   { $set: { ...req.body } }
  // );

  const updatedCourse = await Course.findByIdAndUpdate(
    { _id: courseId },
    { price: req.body.price, title: req.body.title },
    // this line to exclude __V from response.
    // (new: true) to return the new(updated) courses not old. 
    // projection: { __v: 0 } to exclude __V from response.
  { new: true, projection: { __v: 0 } }
  );

  return res.json({
    status: httpStatus.SUCCESS,
    data: { updatedCourse: updatedCourse },
  });

  // try {

  // findoneandupdate
  // const updatedCourse = await Course.findByIdAndUpdate(
  //   { _id: courseId },
  //   { price: req.body.price, title: req.body.title },
  // new: true to return new(updated) courses not old.
  //   { new: true }
  // );

  // } catch (err) {
  //   return res.status(400).json({ error: err });
  // }
});

const deleteCourse = asyncWrapper( async (req, res) => {
  const courseId = req.params.courseId;
  await Course.deleteOne({ _id:courseId });
  res.status(200).json({ status: httpStatus.SUCCESS, data: null });
});

module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
