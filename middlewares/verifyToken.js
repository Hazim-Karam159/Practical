const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const CONSTANTS = require("../utils/CONSTANT");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!authHeader) {
    const error = appError.create("token is required", 401, CONSTANTS.ERROR);
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SEC_KEY,
      process.env.JWT_SEC_KEY
    );
    next();
  } catch (err) {
    const error = appError.create("invalid token", 401, CONSTANTS.Error);
    return next(error);
  }
};

module.exports = verifyToken;
