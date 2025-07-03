const bcrypt = require("bcrypt");
const { User, validateUser, loginValidate } = require("../model/user.model");
const Joi = require("joi");

// ✅ REGISTER CONTROLLER
const userCheck = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // ❗FIXED: Do not overwrite the User model
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "User already exists with this email" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    await new User({ ...req.body, password: hashedPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Register error:", error); // ✅ helpful log
    res.status(500).send({ message: "Internal server error" });
  }
};

// ✅ LOGIN CONTROLLER
const userLogin = async (req, res) => {
  try {
    const { error } = loginValidate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.status(200).send({ message: "User login successfully", data: token });
  } catch (error) {
    console.error("Login error:", error); // ✅ helpful log
    res.status(500).send({ message: "Internal server error" });
  }
};

// ✅ FIXED: Export correct controller functions
module.exports = { userCheck, userLogin };
