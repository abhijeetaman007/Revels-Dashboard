const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema(
  {
    eventID: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    description: {
      type: String,
    },
    eventType: {
      type: String,
      enum: ["CULTURAL", "SPORTS", "MISC"],
    },
    mode: {
      type: String,
      enum: ["OFFLINE", "ONLINE"],
    },
    participationCriteria: {
      type: String,
    },
    prize: {
      type: String,
    },
    minMembers: {
      type: Number,
      min: 1,
    },
    maxMembers: {
      type: Number,
    },
    eventHeads: [
      {
        name: {
          type: String,
        },
        phoneNo: {
          type: Number,
        },
        email: {
          type: String,
        },
      },
    ],
    eventDateTime: {
      type: Date,
      // required: true,
    },
    eventVenue: {
      type: String,
      // required: true,
    },
    registrationDeadline: {
      type: Date,
      // required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    // To check for if team delegate card is enough for participation -- person with delegate will Add to team
    teamDelegateCard: {
      type: Boolean,
      default: false,
    },
    delegateCards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DelCard",
      },
    ],
    rounds: [
      {
        roundNumber: {
          type: Number,
          default: 1,
        },
        judges: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Judge",
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = Event = mongoose.model("Event", EventSchema);
