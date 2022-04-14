const mongoose = require("mongoose");
const userTshirt = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sale: {
    xs: {
      pending: {
        type: Number,
        default: 0,
      },
      collected: {
        type: Number,
        default: 0,
      },
    },
    s: {
      pending: {
        type: Number,
        default: 0,
      },
      collected: {
        type: Number,
        default: 0,
      },
    },
    m: {
      pending: {
        type: Number,
        default: 0,
      },
      collected: {
        type: Number,
        default: 0,
      },
    },
    l: {
      pending: {
        type: Number,
        default: 0,
      },
      collected: {
        type: Number,
        default: 0,
      },
    },
    xl: {
      pending: {
        type: Number,
        default: 0,
      },
      collected: {
        type: Number,
        default: 0,
      },
    },
    xxl: {
      pending: {
        type: Number,
        default: 0,
      },
      collected: {
        type: Number,
        default: 0,
      },
    },
    xxxl: {
      pending: {
        type: Number,
        default: 0,
      },
      collected: {
        type: Number,
        default: 0,
      },
    },
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
});

module.exports = Event = mongoose.model("Tshirt", TshirtSchema);
