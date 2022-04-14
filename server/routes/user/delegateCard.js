const DelCard = require("../../models/DelegateCard");
const Transaction = require("../../models/Transaction");
const { nanoid } = require("nanoid");
const User = require("../../models/User");

const requestDelegateCard = async (req, res) => {
  try {
    let { delegateCard, amount } = req.body;
    let card = await DelCard.exists({ _id: delegateCard, isActive: true });
    if (!card)
      return res
        .status(400)
        .send({ msg: "Delegate Card Invalid", success: false });
    if (amount == 0) {
      await User.updateOne(
        { _id: req.requestUser._id },
        { $addToSet: { delegateCards: delegateCard } }
      );
      let ids = await Transaction.find({}, { orderId: 1, _id: 0 })
        .sort({ orderId: -1 })
        .limit(1);
      let orderId = 10001;
      if (ids[0]) {
        orderId = ids[0].orderId + 1;
      }
      let r = (Math.random() + 1).toString(36).substring(7);
      let newTransaction = new Transaction({
        user: req.requestUser._id,
        delegateCard: delegateCard,
        orderId: orderId,
        name: "0_" + r,
        amount: amount,
        isPaymentConfirmed: true,
      });
      await User.updateOne(
        { _id: req.requestUser._id },
        {
          $pull: { pendingDelegateCards: delegateCard },
          $addToSet: { delegateCards: delegateCard },
        }
      );
      await newTransaction.save();
      return res.status(200).send({
        success: true,
        msg: "Delegate Card Successfully Purchased",
      });
    }

    let delegateCardExists = await User.exists({
      _id: req.requestUser._id,
      delegateCards: delegateCard,
    });
    if (delegateCardExists)
      return res.status(200).send({
        success: false,
        msg: "Delegate Card Already Purchased",
      });
    delegateCardExists = await User.exists({
      _id: req.requestUser._id,
      pendingDelegateCards: delegateCard,
    });
    if (delegateCardExists)
      return res.status(200).send({
        success: false,
        msg: "Delegate Card Already Requested",
      });
    await User.updateOne(
      { _id: req.requestUser._id },
      { $addToSet: { pendingDelegateCards: delegateCard } }
    );
    return res.status(200).send({
      success: true,
      msg: "Delegate Card Successfully Requested",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const getMyDelegateCards = async (req, res) => {
  try {
    let delegateCards = await User.findOne(
      { _id: req.requestUser._id, isPaymentConfirmed: true },
      { delegateCards: 1 }
    ).populate("delegateCards");
    return res
      .status(200)
      .send({ success: true, data: delegateCards.delegateCards });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const getPendingDelegateCards = async (req, res) => {
  try {
    console.log(req.query);
    let delegateCards = await User.findOne(
      { userID: req.query.delegateID },
      {
        pendingDelegateCards: 1,
        name: 1,
        userID: 1,
        isMahe: 1,
        delegateCards: 1,
        college: 1,
      }
    ).populate("pendingDelegateCards delegateCards");
    console.log(delegateCards);
    return res.status(200).send({ success: true, data: delegateCards });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};
const getProshowCards = async (req, res) => {
  try {
    console.log(req.query);
    let delegateCards = await User.findOne(
      {
        userID: req.query.delegateID,
        pendingDelegateCards: "624b37324fda25e0e4990ed2",
      },
      { "pendingDelegateCards.$": 1, name: 1, userID: 1, isMahe: 1 }
    ).populate("pendingDelegateCards");
    return res.status(200).send({ success: true, data: delegateCards });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const getAllDelegateCards = async (req, res) => {
  try {
    let delCards = await DelCard.find({}).sort({ isActive: -1, type: -1 });
    //console.log('All Cards ', delCards);
    return res.status(200).send({ success: true, data: delCards });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const getAllMyTransactions = async (req, res) => {
  try {
    let transactions = await Transaction.find({
      user: req.requestUser._id,
    }).populate("delegateCard");
    return res.status(200).send({ success: true, data: transactions });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const approvedPendingDelegateCard = async (req, res) => {
  try {
    const { delegateId, user, mode, receiptID, amount, adminID } =
      req.body.data;

    const recieptExists = await Transaction.exists({
      name: "offline_" + receiptID,
    });
    if (recieptExists)
      return res.status(200).send({ success: false, msg: "Duplicate Reciept" });
    let ids = await Transaction.find({}, { orderId: 1, _id: 0 })
      .sort({ orderId: -1 })
      .limit(1);
    let orderId = 10001;
    if (ids[0]) {
      orderId = ids[0].orderId + 1;
    }
    let newTransaction = new Transaction({
      user: user,
      delegateCard: delegateId,
      orderId: orderId,
      name: "offline_" + receiptID,
      amount: amount,
      recievedBy: adminID,
      transactionData: { mode: mode },
      isPaymentConfirmed: true,
    });
    await newTransaction.save();
    if (delegateId != "62526614385b39119957225a") {
      await User.updateOne(
        { _id: user },
        {
          $pull: { pendingDelegateCards: delegateId },
          $addToSet: { delegateCards: delegateId },
        }
      );
    } else {
      await User.updateOne(
        { _id: user },
        {
          $pull: {
            pendingDelegateCards: "62526614385b39119957225a",
            delegateCards: "624603fe950a69cc464ff72c",
          },
        }
      );
      let us = await User.findOneAndUpdate(
        { _id: user },
        {
          $addToSet: { delegateCards: "62460435950a69cc464ff730" },
        }
      );
      console.log(us);
    }

    return res.status(200).send({ success: true, data: newTransaction });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = {
  getAllDelegateCards,
  getMyDelegateCards,
  getAllMyTransactions,
  getPendingDelegateCards,
  requestDelegateCard,
  approvedPendingDelegateCard,
  getProshowCards,
};
