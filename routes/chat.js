const express = require('express');
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");

// const endpoint = "http://localhost:5555"; // socket io connection
// const socket = socketIOClient(endpoint);

/* GET home page */
router.get("/:chatroom", (req, res) => {
  Message.find( { chatroom: req.params.chatroom} )
    .populate("posted_by")
    .then(response => {
      console.log(response)
      let data = response.map(message => {
        let {_id, content, created_at, chatroom} = message;
        let {username, geolocation} = message.posted_by;
        let userId = message.posted_by._id;
            return {
              messageId: _id,
              content: content,
              created_at: created_at,
              username: username,
              userId: userId,
              geolocation: geolocation,
              chatroom: chatroom
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
  if (req.body.user) {
    Message.create({
      content: req.body.message,
      posted_by: req.user._id,
      chatroom: req.body.chatroom
    })
  }
   
  res.json({message: "Post was successful"});
});

module.exports = router;
