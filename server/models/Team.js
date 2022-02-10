const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  teamID: {
    type: Number,
    required: true,
    unique: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Team = mongoose.model("Team", TeamSchema);
