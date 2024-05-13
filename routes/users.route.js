const userControllers = require("../controllers/users.controllers");
const verifyToken = require("../middlewares/verifyToken");
const express = require("express");
const router = express.Router();

router.route("/")
  .get(verifyToken ,userControllers.getUsers);

  router.route("/register")
  .post(userControllers.register);

  router.route("/login")
  .post(userControllers.login);

module.exports = router;
