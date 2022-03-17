const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema(
  {
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
    status: {
      type: Number,
      default: 0,
      enum: [0, 1, 2], //0 - unreviewed, 1 - Accepted, 2 - Rejected
    },
  },
  { timestamps: true }
);
module.exports = {
  FileSchema: fileSchema,
  File: mongoose.model("File", fileSchema),
};
