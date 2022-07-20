const db = require("../models");
const User = db.user;
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: null,
        data: null,
        error: err
      });
      return;
    }
    if (user) {
      res.status(400).json({
        success: false,
        message: "Failed! Username is already in use!",
        data: null,
        error: null
      });
      return;
    }
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: null,
          data: null,
          error: err
        });
        return;
      }
      if (user) {
        res.status(400).json({
          success: false,
          message: "Failed! Email is already in use!",
          data: null,
          error: null
        });
        return;
      }
      next();
    });
  });
};
checkValidationForm = (req, res, next) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if ((username.length, email.length, password.length) <= 0) {
    res.status(400).json({
      success: false,
      message: "Failed! Cannot be empty!",
      data: null,
      error: null
    });
  } else if (!email.match(validRegex)) {
    res.status(400).json({
      success: false,
      message: "Failed! Please use a valid email",
      data: null,
      error: null
    });
  } else if (password.length <= 5) {
    res.status(400).json({
      success: false,
      message: "Failed! Password minimum 6 characters",
      data: null,
      error: null
    });
  } else {
    next();
  }
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkValidationForm
};
module.exports = verifySignUp;