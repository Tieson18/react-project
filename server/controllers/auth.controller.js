const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const { response, except } = require("../utils/helper");
const CustomError = require("../utils/error");
const sendMail = require("../utils/mailer");

const handleSignUpAdmin = async (req, res) => {
  try {
    if (!req.body.email) throw new CustomError("Email is required", 400);
    if (!req.body.password) throw new CustomError("Password is required", 400);

    // CHECK IF EMAIL EXISTS
    const email = req.body.email;
    const check = await userModel.findOne({ email });
    console.log("EMAIL:", email);
    console.log("CHECK:", check);
    if (check) throw new CustomError("Email is already exist", 400);

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const admin = await userModel.create({
      ...req.body,
      password: hashedPassword,
      role: "admin",
    });

    // CREATE DATA
    const data = except(admin.toObject(), "password", "_v");

    res.status(201).send(response("Account created!", data));
  } catch (e) {
    console.log(e);
    res
      .status(e.code > 500 ? 500 : e.code)
      .send(response(e.message, null, false));
  }
};

const handleLogin = async (req, res) => {
  try {
    if (!req.body.email) throw new CustomError("Email is required", 400);
    if (!req.body.password) throw new CustomError("Password is required", 400);

    // CHECK IF USER EXISTS
    const admin = await userModel.findOne({ email: req.body.email });
    if (!admin) throw new CustomError("User not found", 404);

    // CHECK IF PASSWORDS MATCH
    if (!(await bcrypt.compare(req.body.password, admin.password)))
      throw new CustomError("Incorrect credentials", 400);

    // GENERATE ACCESS TOKEN
    const token = generateToken({ id: admin._id });

    const data = except(admin.toObject(), "password");

    // SEND BACK TOKEN
    res.status(201).send(
      response("Login successful", {
        admin: data,
        token,
      })
    );
  } catch (e) {
    res.status(e.code || 500).send(response(e.message, null, false));
  }
};
const handleSignUpUser = async (req, res) => {
  try {
    if (!req.body.email) throw new CustomError("Email is required", 400);
    if (!req.body.password) throw new CustomError("Password is required", 400);

    // CHECK IF EMAIL EXISTS
    const email = req.body.email;
    const check = await userModel.findOne({ email });
    console.log("EMAIL:", email);
    console.log("CHECK:", check);
    if (check) throw new CustomError("Email is already exist", 400);

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    // SEND EMAIL
    const sender = await sendMail(
      user.email,
      "Emart Registration Complete",
      `<h1>Hello ${user.name}</h1> <p>Welcome to Emart</p>`
    );

    if (!sender) throw new CustomError("Failed to send mail", 500);
    // CREATE DATA
    const data = except(user.toObject(), "password", "_v");

    res.status(201).send(response("Account created!", data));
  } catch (e) {
    console.log(e);
    res
      .status(e.code > 500 ? 500 : e.code)
      .send(response(e.message, null, false));
  }
};

module.exports = {
  handleSignUpAdmin,
  handleLogin,
  handleSignUpUser,
};
