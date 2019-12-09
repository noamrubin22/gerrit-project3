import axios from "axios";

const handleUpload = theFile => {
  // console.log('file in service: ', theFile)
  return axios
    .post("/upload", theFile)
    .then(response => response.data)
    .catch(err => err.response.data);
};

const saveNewThing = image => {
  // console.log('new thing is: ', newThing)
  return axios
    .put("/profile", image)
    .then(response => response.data)
    .catch(err => err.response.data);
};

export { handleUpload, saveNewThing };
