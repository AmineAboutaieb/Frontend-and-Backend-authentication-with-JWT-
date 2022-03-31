const User = require("../models/User");
const userRegisterValidator = (req, res, next) => {
  req.check("firstName", "First name is required").notEmpty();
  req.check("lastName", "Last name is required").notEmpty();
  req.check("email", "Invalid email").isEmail();
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 8, max: 24 })
    .withMessage("Password must have at least 8 characters");
  req
    .check(
      "password",
      "8 to 24 letter must increase uppercase and lowercase letters, a number and a special character"
    )
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/);

  const errors = req.validationErrors();
  if (errors) {
    const errMessages = errors.map((err) => err.msg);
    res.status(400);
    throw new Error(errMessages);
  }
  next();
};

const userLoginValidator = (req, res, next) => {
  req.check("email", "Email is required").notEmpty();
  req.check("password", "Password is required").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    const errMessages = errors.map((err) => err.msg);
    res.status(400);
    throw new Error(errMessages);
  }
  next();
};

const userById = async (req, res, next) => {
  const user = await User.findById(req._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  req.user = user;
  next();
};

module.exports = {
  userRegisterValidator,
  userLoginValidator,
  userById,
};
