const express = require('express');
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");

// const endpoint = "http://localhost:5555"; // socket io connection
// const socket = socketIOClient(endpoint);

/* GET home page */
router.get("/", (req, res) => {
  Message.find().then(response => {
    // for each message
    const messageHistory = response.map((el => {
      // find user
      User.findById(el.posted_by)
        .then(found => {

          console.log(found.username, el.content)
        })
        .catch(err => {
          console.log("NOOO USER", err)
        })
        return el.content;
    }))
    res.json(response);
  }).catch(err => {
    console.log(err);
  })
});

/* pushes new message in the database */
router.post("/", (req, res) => {

  Message.create({
    content: req.body.input,
    posted_by: req.user
   })
  res.json({message: "Post was successful"});
});

module.exports = router;
