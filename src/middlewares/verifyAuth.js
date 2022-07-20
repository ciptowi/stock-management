const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "No token provided!",
      data: null,
      error: null
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized!",
        data: null,
        error: null
      });
    }
    req.userId = decoded.id;
    next();
  });
};
checkValidationForm = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  if ((username.length, password.length) <= 0) {
    res.status(400).json({
      success: false,
      message: "Cannot be empty!",
      data: null,
      error: null
    });
  } else if (password.length <= 5) {
    res.status(400).json({
      success: false,
      message: "Password minimum 6 characters",
      data: null,
      error: null
    });
  } else {
    next();
  }
};

const verifyAuth = {
  verifyToken,
  checkValidationForm
};

module.exports = verifyAuth;