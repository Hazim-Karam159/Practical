const controllers = require("../controllers/controllers.courses");
const express = require("express");
const router = express.Router();
const validSchema = require("../middlewares/validationSchema");

router
  .route("/")
  .get(controllers.getAllCourses)
  .post(validSchema.validSchema, controllers.addCourse);

router
  .route("/:courseId")
  .get(controllers.getCourse)
  .patch(controllers.updateCourse)
  .delete(controllers.deleteCourse);

module.exports = router;
