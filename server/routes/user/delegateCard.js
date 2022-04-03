const DelCard = require('../../models/DelegateCard');
const Transaction = require('../../models/Transaction');
const { nanoid } = require('nanoid');
const User = require('../../models/User');

const requestDelegateCard = async (req, res) => {
    try {
        let { delegateCard } = req.body;
        let card = await DelCard.exists({ _id: delegateCard, isActive: true });
        if (!card)
            return res
                .status(400)
                .send({ msg: 'Delegate Card Invalid', success: false });
        let delegateCardExists = await User.exists({
            _id: req.requestUser._id,
            delegateCards: delegateCard,
        });
        if (delegateCardExists)
            return res
                .status(200)
                .send({
                    success: false,
                    msg: 'Delegate Card Already Purchased',
                });
        delegateCardExists = await User.exists({
            _id: req.requestUser._id,
            pendingDelegateCards: delegateCard,
        });
        if (delegateCardExists)
            return res
                .status(200)
                .send({
                    success: false,
                    msg: 'Delegate Card Already Requested',
                });
        await User.updateOne(
            { _id: req.requestUser._id },
            { $addToSet: { pendingDelegateCards: delegateCard } }
        );
        return res
            .status(200)
            .send({
                success: true,
                msg: 'Delegate Card Successfully Requested',
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const getMyDelegateCards = async (req, res) => {
    try {
        let delegateCards = await Transaction.find(
            { user: req.requestUser._id, isPaymentConfirmed: true },
            { delegateCards: 1 }
        ).populate('delegateCard');
        return res.status(200).send({ success: true, data: delegateCards });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const getPendingDelegateCards = async (req, res) => {
    try {
        console.log(req.query);
        let delegateCards = await User.findOne(
            { userID: req.query.delegateID },
            { pendingDelegateCards: 1, name: 1, userID: 1, isMahe: 1 }
        ).populate('pendingDelegateCards');
        return res.status(200).send({ success: true, data: delegateCards });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const getAllDelegateCards = async (req, res) => {
    try {
        let delCards = await DelCard.find({ isActive: true });
        //console.log('All Cards ', delCards);
        return res.status(200).send({ success: true, data: delCards });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const getAllMyTransactions = async (req, res) => {
    try {
        let transactions = await Transaction.find({
            user: req.requestUser._id,
        }).populate('delegateCard');
        return res.status(200).send({ success: true, data: transactions });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const approvedPendingDelegateCard = async (req, res) => {
    try {
        const { delegateId, user, mode, receiptID, amount, adminID } =
            req.body.data;

        const recieptExists = await Transaction.exists({ orderId: receiptID });
        if (recieptExists)
            return res
                .status(200)
                .send({ success: false, msg: 'Duplicate Reciept' });
        let newTransaction = new Transaction({
            user: user,
            delegateCard: delegateId,
            name: mode,
            orderId: receiptID,
            amount: amount,
            recievedBy: adminID,
            isPaymentConfirmed: true,
        });
        await newTransaction.save();
        await User.updateOne(
            { _id: user },
            {
                $pull: { pendingDelegateCards: delegateId },
                $addToSet: { delegateCards: delegateId },
            }
        );
        return res.status(200).send({ success: true, data: newTransaction });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = {
    getAllDelegateCards,
    getMyDelegateCards,
    getAllMyTransactions,
    getPendingDelegateCards,
    requestDelegateCard,
    approvedPendingDelegateCard,
};
