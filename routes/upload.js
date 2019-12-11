const express = require("express");
const router = express.Router();

// include CLOUDINARY:
const uploader = require("../configs/cloudinary");

router.post("/", uploader.single("image"), (req, res, next) => {
  console.log("file is: ", req.file);
  const defaultUserImage =
    "https://res.cloudinary.com/justgerrit/image/upload/v1575891083/profilepictures/gerrit_xiixvp.jpg";
  let image = req.file ? req.file.url : defaultUserImage;

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
  // res.json({ secure_url: image });
});

module.exports = router;
