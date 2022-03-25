/* eslint-disable camelcase */
const s3 = require('../../config/aws-s3/s3.config.js');
// const {File} = require('../../models/file');
// const {Task} = require('../../models/task');

const doUpload = async (key, file) => {
  console.log("uplaod");
  const s3Client = s3.s3Client;
  const params = s3.uploadParams;
  params.Key = key;
  params.Body = file.buffer;
  const s3upload = await s3Client.upload(params).promise();
  console.log("uplaod last ",s3upload);
  return s3upload;
};

module.exports = {
  doUpload: doUpload,
};
