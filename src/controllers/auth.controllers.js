const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: null,
        data: null,
        error: err.message
      });
      return;
    }
    else {
      res.status(201).json({
        success: true,
        message: "User was registered successfully!",
        data: null,
        error: null
      });
    }
  });
};
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: null,
          data: null,
          error: err.message
        });
        return;
      }
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Failed! User Not found.",
          data: null,
          error: null
        });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).json({
          success: false,
          message: "Failed! Wrong Password",
          data: null,
          error: null,
        });
      }
      var token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).json({
        success: true,
        message: "User logged in successfully!",
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: token
        },
        error: null
      });
    });
};
exports.updateUser = (req, res) => {
  const oldPassword = req.body.oldPassword
  const newData = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }
  const token = req.headers["x-access-token"]
  const userId = jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err.message)
    }
    return decoded.id;
  })
  User.findById(userId).then((user) => {
    const isPassword = bcrypt.compareSync(oldPassword,
      user.password)
    console.log(isPassword)
    if (!isPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password!",
        data: null,
        error: null,
      });
    } else {
      User.findByIdAndUpdate(userId, newData, (err, data) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: null,
            data: null,
            error: err.message
          });
          return;
        }
        else {
          res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: null,
            error: null
          });
        }
      })
    }
  })
}
exports.deleteUser = (req, res) => {
  const token = req.headers["x-access-token"]
  const userId = jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err.message)
    }
    return decoded.id;
  })
  User.findByIdAndDelete(userId,
    (err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: null,
          data: null,
          error: err.message
        });
        return;
      }
      else {
        res.status(200).json({
          success: true,
          message: "User deleted successfully!",
          data: null,
          error: null
        });
      }
    });
}