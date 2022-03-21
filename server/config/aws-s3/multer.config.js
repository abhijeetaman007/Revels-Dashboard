const multer = require("multer");
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
const multipleUpload = multer({ storage: storage }).fields([
  {
    name: "aadhar",
    maxCount: 1,
  },
  {
    name: "collegeId",
    maxCount: 1,
  },
  {
    name: "vaccination",
    maxCount: 1,
  },
]);
const upload = multer({ storage: storage }).single("cdfile");
module.exports = {
  upload: upload,
  multipleUpload: multipleUpload,
};
