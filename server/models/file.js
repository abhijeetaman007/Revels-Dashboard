const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
});
module.exports = {
  FileSchema: fileSchema,
  File: mongoose.model('File', fileSchema),
};
