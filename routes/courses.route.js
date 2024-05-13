const courseControllers = require("../controllers/courses.controllers");
const express = require("express");
const router = express.Router();
const validSchema = require("../middlewares/validationSchema");

router
  .route("/")
  .get(courseControllers.getCourses)
  .post(validSchema.validSchema, courseControllers.addCourse);

router
  .route("/:courseId")
  .get(courseControllers.getCourse)
  .patch(courseControllers.updateCourse)
  .delete(courseControllers.deleteCourse);

module.exports = router;
