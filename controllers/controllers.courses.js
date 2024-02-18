let { courses } = require("../data/courses");

const { validationResult } = require("express-validator");

const getAllCourses = (req, res) => {
  res.json(courses);
};

const getCourse = (req, res) => {
  const courseId = +req.params.courseId;
  const course = courses.find((course) => course.id === courseId);
  res.json(course);
};

const addCourse = (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return res.status(400).json(err.array());
  const course = { id: courses.length + 1, ...req.body };

  courses.push(course);
  res.status(201).json(course);
};

const updateCourse = (req, res) => {
  const courseId = +req.params.courseId;
  let course = courses.find((course) => course.id === courseId);
  course = { ...course, ...req.body };
  res.json(course);
};

const deleteCourse = (req, res) => {
  const courseId = +req.params.courseId;
  courses = courses.filter((course) => course.id !== courseId);
  res.json(courses);
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
