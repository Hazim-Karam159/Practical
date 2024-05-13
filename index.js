const express = require("express");
const app = express();
require("dotenv").config();
// to avoid error when frontend want to conncet with yout backend APIs. (use cors npm package)
const cors = require("cors");

const courseRouter = require("./routes/courses.route");
const userRouter = require("./routes/users.route");

const CONSTANTS = require("./utils/CONSTANT");

const dbconnection = require("./config/database");

dbconnection();

// This middleware enables JSON parsing for incoming requests to js object.
// parsing incoming json (as encoded String) and app.use(express.json()); convert encoded String to js object as i can read the values from it like req.body.name.
app.use(express.json());
app.use(cors());

app.use("/api/courses", courseRouter);

app.use("/api/users", userRouter);
// global middleware for not found route.
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: CONSTANTS.FAIL,
    message: "this resource is not found, try again",
  });
});

// global error handler
app.use((error, req, res, next) => {
  res
    .status(error.statusCode || 500)
    .json({
      status: error.statusText || CONSTANTS.ERROR,
      message: error.message,
      code: error.statusCode || 500,
      data: null,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App runing on port ${PORT} 🙈❤`);
});
