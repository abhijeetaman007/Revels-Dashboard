const mongoose = require("mongoose");
const DelCard = require("./DelegateCard");
const User = require("./User");

const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    delegateCard: {
      type: mongoose.Types.ObjectId,
      ref: "DelCard",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    recievedBy: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
    },
    orderId: {
      type: Number,
    },
    transactionData: {
      type: Object,
    },
    amount: {
      type: String,
    },
    isPaymentConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = Transaction = mongoose.model("Transaction", transactionSchema);
