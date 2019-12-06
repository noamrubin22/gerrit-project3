const express = require("express");
const router = express.Router();
const User = require("../models/User");

// show user profile
router.get("/", (req, res) => {
  console.log("get route profile");
  // const profileId = req.user._id
  // res.json(res);
  User.findById(req.user._id).then(response => {
    console.log(response);
    res.json(response);
  });
});

// edit user profile
router.put("/", (req, res) => {
  console.log("put route profile");
  console.log("useeeer", req.body);

  User.findByIdAndUpdate(
    req.user._id,
    {
      quote: req.body.quote
    },
    { new: true }
  )
    .then(user => {
      // console.log(user);
      res.json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
