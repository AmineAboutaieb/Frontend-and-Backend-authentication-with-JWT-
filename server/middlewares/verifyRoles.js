const verifyRoles = (roles) => {
  return (req, res, next) => {
    const userRoles = req.user.roles;
    roles.map((role) => {
      if (!userRoles.includes(role)) {
        res.status(405);
        throw new Error("Unauthorized (role)");
      }
    });
    next();
  };
};

module.exports = {
  verifyRoles,
};
