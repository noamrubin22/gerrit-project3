// Seeds file that remove all users and create 2 new users AND that creates a collection with Geobuckets

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const Chatroom = require('../models/Chatroom');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/gerrit-project3', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})


//create Geobuckets
const getGeoBuckets = (initialCoordinates, sideLength, horizontalBucketsAmount, verticalBucketsAmount) => {
  class GeoBucket {
      constructor(initialCoordinates, sideLength, bucketIndex) {
          this.bucketId = "bucket" + bucketIndex;
          this.latitudeRange = [initialCoordinates[0], initialCoordinates[0] - sideLength];
          this.longitudeRange = [initialCoordinates[1], initialCoordinates[1] + sideLength];
          this.area = [this.latitudeRange, this.longitudeRange];
      }
  }
  
  mongoose
    .connect('mongodb://localhost/gerrit-project3', {useNewUrlParser: true})
    .then(x => {
      console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
      console.error('Error connecting to mongo', err)
    });
  
  let geoBuckets = [];
  let bucketTopLeft = [];
  let counter = 1;
  
  for (let i = 0; i < verticalBucketsAmount; i++) {
      for (let j = 0; j < horizontalBucketsAmount; j++) {
          if (i === 0 && j === 0) {
              bucketTopLeft = [...initialCoordinates];
          }
          //insert each bucket into the database (--> mongoose)
          let newBucket = new GeoBucket(bucketTopLeft, sideLength, counter);
          let currentBucketId = newBucket.bucketId;
          let currentBucketArea = newBucket.area;
          let currentBucket = {
            users: [],
            location: currentBucketArea,
            messages: [],
            namespace: currentBucketId
          }
          geoBuckets.push(currentBucket);
          
          bucketTopLeft[1] += sideLength;
          if (j === horizontalBucketsAmount - 1) {
              bucketTopLeft[1] = initialCoordinates[1]
          }
          counter ++;
          console.log("bucket created")
      }
      bucketTopLeft[0] -= sideLength;
  }
  return geoBuckets
}

const initialCoordinates = [52.509463, 13.389967];
const sideLength = 0.015033;
const horizontalBucketsAmount = 3;
const verticalBucketsAmount = 2;

let geoBuckets = getGeoBuckets(initialCoordinates, sideLength, horizontalBucketsAmount, verticalBucketsAmount);

Chatroom.deleteMany()
  .then(() => {
    return Chatroom.create(geoBuckets)
  })
  .then(bucketsCreated => {
    console.log(`${bucketsCreated.length} users created with the following id:`)
  })
  .then( () => {
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
