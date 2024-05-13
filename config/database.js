const mongoose = require("mongoose");

const dbconnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((connect) => {
      console.log(`mongobDB connected: ${connect.connection.host} `);
      // connect.connection.host == host of my DB.
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = dbconnection;