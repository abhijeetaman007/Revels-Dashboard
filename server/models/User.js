const mongoose = require("mongoose");
const Event = require("./Event");
const DelCard = require("./DelegateCard");
const file = require("./file");

const UserSchema = new mongoose.Schema(
  {
    //userID: will be used as ID in frontend for each user not mongo's _id
    userID: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "USER",
      enum: ["USER"],
    },
    token: {
      type: String,
      default: "",
    },
    passwordResetToken: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    branch: {
      type: String,
      default: "",
    },
    college: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    isMahe: {
      type: Boolean,
      required: true,
    },
    accommodation: {
      required: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        enum: ["TIER-1", "TIER-2"],
      },
    },
    documents: {
      aadhar: {
        type: file.FileSchema,
      },
      vaccination: {
        type: file.FileSchema,
      },
    },
    verified: {
      type: String,
      enum: ["VERIFIED", "REJECTED", "UNVERIFIED"],
      default: "UNVERIFIED",
    },
    regEvents: [
      {
        event: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
        },
        isPresent: {
          type: Boolean,
          default: false,
        },
      },
    ],
    //   teamList: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Team",
    //     },
    //   ],
    //Stores all types of delegate Card/Tickets
    // NOTE: Each user should have max one delegate card of each type
    delegateCard: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DelCard",
      },
    ],
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
