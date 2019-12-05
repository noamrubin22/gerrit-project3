// define function to create geo buckets
// these will later be needed to seed the database
const getGeoBuckets = (initialCoordinates, sideLength, horizontalBucketsAmount, verticalBucketsAmount) => {
  class GeoBucket {
      constructor(initialCoordinates, sideLength, bucketIndex) {
          this.bucketId = "bucket" + bucketIndex;
          this.latitudeRange = [initialCoordinates[0], initialCoordinates[0] - sideLength];
          this.longitudeRange = [initialCoordinates[1], initialCoordinates[1] + sideLength];
          this.area = [this.latitudeRange, this.longitudeRange];
      }
  }
  
  let geoBuckets = [];
  let bucketTopLeft = [];
  let counter = 1;
  
  for (let i = 0; i < verticalBucketsAmount; i++) {
      for (let j = 0; j < horizontalBucketsAmount; j++) {
          if (i === 0 && j === 0) {
              bucketTopLeft = [...initialCoordinates];
          }
          //here we could insert a function to insert each bucket into the database (--> mongoose)
          let currentBucket = new GeoBucket(bucketTopLeft, sideLength, counter);
          console.log(currentBucket.bucketId);
          console.log(currentBucket.area);
          //geoBuckets.push(new GeoBucket(bucketTopLeft, sideLength, counter));
          bucketTopLeft[1] += sideLength;
          if (j === horizontalBucketsAmount - 1) {
              bucketTopLeft[1] = initialCoordinates[1]
          }
          counter ++;
          console.log("bucket created")
      }
      bucketTopLeft[0] -= sideLength;
  }
  
  return geoBuckets;
}


// define function to check if person is in a geobucket, and return in which
const checkChatroomAvailability = (geoBuckets) => {
  return navigator.geolocation.getCurrentPosition((positionData) => {

      let {latitude, longitude} = positionData.coords
      console.log("your latitude: ",latitude);
      console.log("your longitude: ", longitude);
      let currentBucket = geoBuckets.filter(bucket => 
          (latitude <= bucket.latitudeRange[0] &&
          latitude >= bucket.latitudeRange[1] &&
          longitude >= bucket.longitudeRange[0] &&
          longitude <= bucket.longitudeRange[1])
      )
      if(currentBucket.length>0){
        console.log("You are in: ", currentBucket[0].id);  
        return currentBucket[0].id;
      }
      console.log("You are outside of any chat areas.")
      return false
  });
};

// create array of buckets with the following specs
// 6 buckets covering most of Kreuzberg
const initialCoordinates = [52.509463, 13.389967];
const sideLength = 0.015033;
const horizontalBucketsAmount = 3;
const verticalBucketsAmount = 2;

let geoBuckets = getGeoBuckets(initialCoordinates, sideLength, horizontalBucketsAmount, verticalBucketsAmount)

console.log(geoBuckets);

checkChatroomAvailability(geoBuckets);
