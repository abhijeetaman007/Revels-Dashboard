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
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        attendance: [],
      },
    ],
    requestedMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rounds: [
      {
        roundNumber: {
          type: Number,
          default: 1,
        },
        scores: [
          {
            judge: { type: mongoose.Schema.Types.ObjectId, ref: "Judge" },
            score: { type: Number, default: 0 },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = Team = mongoose.model("Team", TeamSchema);
