const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
require("dotenv").config();

// Define User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// JWT Token Generator Method
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

// Create Mongoose Model
const User = mongoose.model("User", userSchema);

// Register Validation
const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).required().label("First Name"),
    lastName: Joi.string().min(3).max(30).required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(user);
};

// Login Validation
const loginValidate = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(user);
};

module.exports = { User, validateUser, loginValidate };
