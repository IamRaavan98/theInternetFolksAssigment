const memberModel = require("../models/memberModel");

const verifyRoles = (...roles) => {
  return async (req, res, next) => {
    const user = req.user._id;
    const userRoleInCommunity = await memberModel
      .findOne({ user })
      .populate("role", "name id");

    const roleArray = [...roles];
    const data = roleArray.map((t) => t === userRoleInCommunity?.role?.name);
    if (data.includes(true)) {
      next();
    } else {
      return res.status(401).json({
        success: false,
        error: "unauthorized access",
      });
    }
  };
};
module.exports = verifyRoles;
