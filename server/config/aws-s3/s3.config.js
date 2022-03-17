const AWS = require("aws-sdk");
const Bucket = process.env.BUCKET;
const s3Client = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});
const uploadParams = {
  Bucket: Bucket,
  Key: "", // pass key
  Body: null, // pass file body
  ContentEncoding: "base64",
};

const s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

module.exports = s3;
