const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({
      message: "Please provide a username"
    });
  }
  if (password.length < 7) {
    return res.status(400).json({
      messsage: "Password should have at least 7 characters "
    });
  }

  User.findOne({
    username: username
  })
    .then(found => {
      if (found) {
        return res.status(400).json({
          message: "Username is already taken"
        });
      }
      return bcrypt
        .genSalt()
        .then(salt => {
          return bcrypt.hash(password, salt);
        })
        .then(hash => {
          return User.create({
            username: username,
            password: hash,
            image:
              "https://res.cloudinary.com/justgerrit/image/upload/v1575891083/profilepictures/gerrit_xiixvp.jpg"
          });
        })
        .then(newUser => {
          // passport login
          req.login(newUser, err => {
            if (err) res.status(500).json(err);
            else res.json(newUser);
          });
        })
        .catch(err => {
          res.status(500).json(err);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Error while authenticating"
      });
    }
    if (!user) {
      // no user found with username or password didn't match
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }
    // passport req.login
    // creates the passport session
    req.login(user, err => {
      if (err) res.status(500).json(err);
      res.json(user);
    });
  })(req, res, next);
});

router.delete("/logout", (req, res) => {
  // passport logout function
  req.logout();
  res.json({
    message: "Logout was succesful"
  });
});

router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

module.exports = router;
