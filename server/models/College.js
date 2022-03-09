const mongoose = require("mongoose");
const CollegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    state: {
      type: String,
      default: null,
    },
    isMahe: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = College = mongoose.model("College", CollegeSchema);
