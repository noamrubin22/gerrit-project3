const express = require('express');
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");

// const endpoint = "http://localhost:5555"; // socket io connection
// const socket = socketIOClient(endpoint);

/* GET home page */
router.get("/", (req, res) => {
  Message.find()
    .populate("posted_by")
    .then(response => {
      let data = response.map(message => {
        let {_id, content, created_at} = message;
        let {username, geolocation} = message.posted_by;
        let userId = message.posted_by._id;
            return {
              messageId: _id,
              content: content,
              created_at: created_at,
              username: username,
              userId: userId,
              geolocation: geolocation
            }
      })
      res.json(data);
    }) 
    .catch(err => {
      console.log(err);
    })
});

/* pushes new message in the database */
router.post("/", (req, res) => {
  console.log("messagge posted:", req.body);
  if (req.body.user) {
    Message.create({
      content: req.body.message,
      posted_by: req.user._id
    })
  }
   
  res.json({message: "Post was successful"});
});

module.exports = router;
