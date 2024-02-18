const { body } = require("express-validator");

const validSchema = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 2 })
    .withMessage("course name should contain more than 2 char"),
  body("price").notEmpty().withMessage("price is required"),
];

module.exports = {
  validSchema,
};
