const DelCard = require('../../models/DelegateCard');
const Transaction = require('../../models/Transaction');
const razorpay = require('../../index');
const shortid = require('shortid');
const crypto = require('crypto');

//Registering Order on Razorpay server
const registerOrder = async (req, res) => {
    try {
        let { delCard_id } = req.body;
        let delegateCard = await DelCard.findById(delCard_id);
        if (!delegateCard)
            return res.status(400).send({
                success: false,
                msg: 'No Delegate-Card/ProShow Found',
            });

        const options = {
            amount: delegateCard.price * 100,
            currency: 'INR',
            receipt: shortid.generate(),
            payment_capture: 1,
        };

        let response = await razorpay.orders.create(options);
        console.log(response);

        if (!response)
            return res.status(500).send({
                success: false,
                msg: 'Razorpay Server Issue,Please try after sometime',
            });

        //New Transaction Initiated
        let newTransaction = new Transaction({
            user: req.requestUser._id,
            delegateCard: delegateCard._id,
            orderId: response.id,
            amount: response.amount,
            isPaymentConfirmed: false,
        });

        await newTransaction.save();

        return res.status(200).send({
            success: true,
            msg: 'Order Registered with Razorpay and New Transaction initiated',
            data: newTransactions,
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

//To verify payment has been registered
//In production razorpay webhook will hit this endpoint on money deducted by razorpay
const verifyPayment = (req, res) => {
    try {
        // confirmation to razorpay
        res.sendStatus(200);

        //Validating
        const secret = 'Hj08oLHfEU';
        console.log(req.body);
        const hash = crypto.createHmac('sha256', secret);
        hash.update(JSON.stringify(req.body));
        const digest = hash.digest('hex');

        console.log(digest, req.headers['x-razorpay-signature']);

        //If validation true confirm payment in DB
        if (digest === req.headers['x-razorpay-signature']) {
            console.log('Valid Request,Confirming Payment');
            let transaction = Transaction.findOne({
                orderId: req.body.payload.payment.entity.order_id,
            });
            if (transaction) {
                (transaction.isPaymentConfirmed = true),
                    (transaction.transactionData = req.body);
                await transaction.save();
            }
        } else {
            console.log(
                'Payment validation attempt from unknown source,payment not registered'
            );
        }
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { verifyPayment, registerOrder };
