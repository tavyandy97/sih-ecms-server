var { User } = require("../models/user");
const jwt = require("jsonwebtoken");

var authenticate = (req, res, next) => {
  var token = req.header("x-auth");
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).send({
      errorMessage: "Invalid token or expired token"
    });
  }
};

module.exports = {
  authenticate
};
