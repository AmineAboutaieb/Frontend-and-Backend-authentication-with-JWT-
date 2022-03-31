const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const accessToken = req.cookies.jwt;
  if (!accessToken) {
    res.status(403);
    throw new Error("Unauthorized");
  }
  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    req._id = payload._id;
    next();
  } catch (e) {
    res.status(403);
    throw new Error("Unauthorized");
  }
};

module.exports = {
  verifyJWT,
};
