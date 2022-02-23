const mongoose = require("mongoose");

// To store all delegate Card and Proshow Tickets types
const DelCardSchema = new mongoose.Schema({
  cardID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  isProShow: {
    type: Boolean,
    required: true,
  },
  mahePrice: {
    type: Number,
  },
  nonMahePrice: {
    type: Number,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  //Contains Info about the type of delegate card
  description: {
    type: String,
  },
  maxCount: {
    type: Number,
  },
});

module.exports = DelCard = mongoose.model("DelCard", DelCardSchema);
