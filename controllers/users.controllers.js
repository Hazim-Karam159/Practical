const CONSTANTS = require("../utils/CONSTANT");
const User = require("../models/user.model");
const validator = require("validator");
const bcrypt = require("bcrypt");
// const asyncHandler = require("express-async-handler");
const asyncWrapper = require("../middlewares/asyncWrapper.js");
const appError = require("../utils/appError.js");
// sec step to generate token
const jwt = require("jsonwebtoken");

const generateJWT = require("../utils/generateJWT.js");

const getUsers = asyncWrapper(async (req, res) => {
  // pagination code.
  const query = req.query;
  const limit = query.limit || 5;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);

  res.json({
    status: CONSTANTS.SUCCESS,
    numberOfUsers: users.length,
    page,
    data: { users },
  });
});

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = appError.create("user already exits", 400, CONSTANTS.FAIL);
    return next(error);
  }
  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPass,
  });

  // to generate random jwt use this line in terminal enter node then enter this line.
  // require('crypto').randomBytes(32).toString('hex');

  const token = await generateJWT({ email: newUser.email, id: newUser._id });
  

  newUser.token = token;

  await newUser.save();
  res.status(201).json({ status: CONSTANTS.SUCCESS, data: { user: newUser } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
     const error = appError.create(
      "Email and Password is required.",
      400,
      CONSTANTS.FAIL
    );
    return next(error);
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = appError.create("user not found", 404, CONSTANTS.FAIL);
    return next(error);
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (user && matchedPassword)
    {
      const token = await generateJWT({ email: user.email, id: user._id });

      return res.status(200).json({
        status: CONSTANTS.SUCCESS,
        data: { token}
      });
    }
  else {
    const error = appError.create("something wrong", 500, CONSTANTS.ERROR);
    return next(error);
  }
});

module.exports = {
  getUsers,
  register,
  login,
};
