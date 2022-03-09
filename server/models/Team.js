const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    teamID: {
      type: String,
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
  },
  { timestamps: true }
);

module.exports = Team = mongoose.model("Team", TeamSchema);
