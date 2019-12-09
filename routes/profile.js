const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Message = require("../models/Message");
const uploader = require("../configs/cloudinary");

// show user profile
router.get("/", (req, res) => {
  console.log("get route profile");
  // const profileId = req.user._id
  // res.json(res);
  User.findById(req.user._id)
    .then(response => {
      console.log(response);
      // res.json(response);
      Message.find({ posted_by: req.user._id })
        .then(messages => {
          console.log("hello ");
          console.log(messages.length);
          res.json({ messages: messages.length });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

// edit user profile
router.put("/", uploader.single("image"), (req, res) => {
  console.log("put route profile");
  console.log("useeeer", req.body);
  // const defaultUserImage =
  //   "https://res.cloudinary.com/justgerrit/image/upload/v1575891083/profilepictures/gerrit_xiixvp.jpg";
  // let image = req.file ? req.file.url : defaultUserImage;

  User.findByIdAndUpdate(
    req.user._id,
    {
      quote: req.body.quote,
      image: req.body.image
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
