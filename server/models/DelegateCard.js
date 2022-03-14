const mongoose = require("mongoose");

// To store all delegate Card and Proshow Tickets types
const DelCardSchema = new mongoose.Schema(
  {
    cardID: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
      enum: ["PROSHOW", "INF", "GAMING", "WORKSHOPS","GENERAL"],
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
  },
  { timestamps: true }
);

module.exports = DelCard = mongoose.model("DelCard", DelCardSchema);
