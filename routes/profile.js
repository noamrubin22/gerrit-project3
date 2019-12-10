const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Message = require("../models/Message");
const uploader = require("../configs/cloudinary");

// show user profile
router.get("/:id", (req, res) => {
  console.log("get route profile");

  const userId = req.params.id;

  User.findById(userId)
    .then(response => {
      console.log(response);
      Message.find({ posted_by: userId })
        .then(messages => {
          res.json({ messages: messages.length, user: response });
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
router.put("/:id", uploader.single("image"), (req, res) => {
  console.log("put route profile");

  User.findByIdAndUpdate(
    req.user._id,
    {
      quote: req.body.quote,
      image: req.body.image
    },
    { new: true }
  )
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
