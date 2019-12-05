const express = require('express');
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res) => {
  console.log(res);
  console.log(req);
  console.log("got in get route")
  res.json(req);
});

router.post("/", (req, res) => {
  console.log("successful post")
  console.log(req.user);

  Message.create({
    content: req.body.input,
    posted_by: req.user
   })
  res.json({message: "Post was successful"});
});

module.exports = router;
