const jwt = require("jsonwebtoken");
const config = require("config");

// create function that has access to req, res, and next
module.exports = function(req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No Token, authorization denied" });
  }

  // Verify token
  try {
    // decode the token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // take req.user and assign a value to user
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
