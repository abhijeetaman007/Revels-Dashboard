const mongoose = require("mongoose");
const JudgeSchema = new mongoose.Schema(
  {
    judgeID: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    access: [
      {
        event: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
        },
        round: {
          type: Number,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    // To check for if team delegate card is enough for participation -- person with delegate will Add to team
  },
  { timestamps: true }
);

module.exports = Event = mongoose.model("Judge", JudgeSchema);
