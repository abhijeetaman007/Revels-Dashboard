/* eslint-disable camelcase */
const s3 = require('../../config/aws-s3/s3.config.js');
// const {File} = require('../../models/file');
// const {Task} = require('../../models/task');

const doUpload = (key, file) => {
  const s3Client = s3.s3Client;
  const params = s3.uploadParams;
  params.Key = key;
  params.Body = file.buffer;
  const s3upload = s3Client.upload(params).promise();
  return s3upload;
};

module.exports = {
  doUpload: doUpload,
};
