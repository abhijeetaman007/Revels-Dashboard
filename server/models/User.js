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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
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
    isMIT: {
      type: Boolean,
      required: true,
    },
    isMahe: {
      type: Boolean,
      required: true,
    },
    accommodation: {
      required: {
        type: Number,
        default: 0,
        enum: [0, 1, 2, 3],
      },
      arrivalDateTime: {
        type: Date,
      },
    },
    documents: {
      aadhar: {
        type: file.FileSchema,
      },
      vaccination: {
        type: file.FileSchema,
      },
      undertaking: {
        type: file.FileSchema,
      },
    },
    status: {
      type: String,
      enum: ["VERIFIED", "REJECTED", "UNVERIFIED", "BANNED"],
      default: "UNVERIFIED",
    },
    regEvents: [
      {
        event: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
        },
        attendance: [
          {
            roundNumber: {
              type: Number,
              default: 1,
            },
          },
          {
            isPresent: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
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
