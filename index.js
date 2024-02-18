const express = require("express");
const app = express();

const router = require("./routes/courses.route");

const controllers = require("./controllers/controllers.courses");

// This middleware enables JSON parsing for incoming requests

app.use(express.json());

app.use("/api/courses", router);

app.listen(3000, () => {
  console.log("server runing 🙈❤");
});
