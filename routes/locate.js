const express = require('express');
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");
const Chatroom = require("../models/Chatroom");

router.post("/", (req, res) => {
  
  let latitude = req.body[0];
  let longitude = req.body[1];

  let allGeobuckets = [];

  //get all chatrooms from database
  Chatroom.find()
    .then(result => {
      allGeobuckets = result;
      console.log(allGeobuckets);
      //check if user is located in one of the chatrooms
      let currentBucket = allGeobuckets.filter(bucket => (
        latitude <= bucket.location[0][0] &&
        latitude >= bucket.location[0][1] &&
        longitude >= bucket.location[1][0] &&
        longitude <= bucket.location[1][1]
      ))
      if (currentBucket) {

        res.json(currentBucket.namespace);
      }
      else {
        res.json("");
      }
    })
    .catch(err => console.log(err));

});

module.exports = router