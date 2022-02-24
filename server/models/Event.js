const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
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
    enum: ["CULTURAL", "SPORTS"],
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
    required: true,
  },
  eventVenue: {
    type: String,
    required: true,
  },
  registrationDeadline: {
    type: Date,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  // Part of Team Schema
  //   participants: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //   ],
  isActive: {
    type: Boolean,
    default: true,
  },
  delegateCard: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "DelCard",
  }],
});

module.exports = Event = mongoose.model("Event", EventSchema);
