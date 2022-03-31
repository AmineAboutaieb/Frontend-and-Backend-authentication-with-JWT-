const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getLoggedInUser,
} = require("../controllers/user");
const {
  userRegisterValidator,
  userLoginValidator,
  userById,
} = require("../middlewares/user");
const { verifyJWT } = require("../middlewares/auth");
const { verifyRoles } = require("../middlewares/verifyRoles");

router.post("/register", userRegisterValidator, register);
router.post("/login", userLoginValidator, login);
router.get("/logout", logout);

router.get(
  "/current-user",
  verifyJWT,
  userById,
  verifyRoles(["user"]),
  getLoggedInUser
);

module.exports = router;
