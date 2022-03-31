const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const email = await User.findOne({ email: req.body.email });
  if (email) {
    res.status(403);
    throw new Error("This account already exists");
  }
  const user = await User.create({ ...req.body, roles: ["user"] });

  res.status(201).json({ message: "Signed up successfully" });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  if (!user.authenticate(password)) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  res.cookie("jwt", token, { expire: new Date() + 9999, httpOnly: true });

  const { firstName, lastName, roles } = user;

  return res.status(200).json({
    message: "Authenticated successfully",
    user: { firstName, lastName, email, roles },
  });
});

const logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(201).json({ message: "Logged out successfully" });
};

const getLoggedInUser = (req, res) => {
  const { firstName, lastName, email, roles } = req.user;

  return res.status(200).json({
    firstName,
    lastName,
    email,
    roles,
  });
};

module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
};
