const mongoose = require("mongoose");

const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      minLength: [2, "is to short"],
      maxLength: [32, "is to long"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
      minLength: [2, "is to short"],
      maxLength: [32, "is to long"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validate: [validator.isEmail, "failed must be a valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      
    },
    // fs token 
    token:{
      type: String,
      
    }
  },
  // add additional info (createdAt, updatedAt) to my DB.
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
