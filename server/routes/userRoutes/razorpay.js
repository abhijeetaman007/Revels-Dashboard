const DelCard = require('../../models/DelegateCard');
const Transaction = require('../../models/Transaction');
// const razorpay = require('../../index');
const Razorpay = require('razorpay');
const shortid = require('shortid');
const crypto = require('crypto');
const mongoose = require('mongoose');

//Registering Order on Razorpay server
const registerOrder = async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: 'rzp_test_YwEGRlKoqLToxD',
            key_secret: 'HyE84sPchHUZ2mqDOyC5j97l',
        });
        let { delCard_id } = req.body;
        delCard_id = mongoose.Types.ObjectId(delCard_id);

        let delegateCard = await DelCard.findById(delCard_id);
        if (!delegateCard)
            return res.status(400).send({
                success: false,
                msg: 'No Delegate-Card/ProShow Found',
            });

        console.log('Selected Delegate Card', delegateCard);
        // String(delegateCard.price * 100)
        const options = {
            amount: (delegateCard.mahePrice * 100),
            currency: 'INR',
            receipt: shortid.generate(),
            payment_capture: true,
        };

        let response;
        await razorpay.orders.create(options, (err, order) => {
            if (err) {
                console.log('Razorpay Error :', err);
                return res
                    .status(500)
                    .send({ success: false, msg: 'Razorpay Server Error' });
            }
            if (order) {
                response = order;
                console.log('Order generated : ', order);
            }
        });
        console.log(response);
        console.log(delegateCard)
        //New Transaction Initiated
        let newTransaction = new Transaction({
            // user: req.requestUser._id,
            user: '620817f8862d3d9cb1bd5105',
            delegateCard: delegateCard._id,
            name:delegateCard.name,
            orderId: response.id,
            amount: response.amount,
            isPaymentConfirmed: false,
        });

        await newTransaction.save();
        console.log("New Transaction initiated",newTransaction)
        return res.status(200).send({
            success: true,
            msg: 'Order Registered with Razorpay and New Transaction initiated',
            data: newTransaction,
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
const verifyPaymentAlternate = async (req, res) => {
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
            let transaction = await Transaction.findOne({
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

const verifyPayment  = async(req,res) =>{
    try
    {
        let {order_id,razorpay_payment_id,razorpay_signature} = req.body
        //Validating
        const secret = 'HyE84sPchHUZ2mqDOyC5j97l';  //Secret Key
        console.log(req.body);

        body=order_id + "|" + razorpay_payment_id;
        var expectedSignature = crypto.createHmac('sha256', secret)
                                        .update(body.toString())
                                        .digest('hex');
                                        console.log("sig received " ,razorpay_signature);
                                        console.log("sig generated " ,expectedSignature);
      
        if(expectedSignature == razorpay_signature)
        {
            let transaction = await Transaction.findOne({
                orderId: order_id,
            });
            console.log("Transaction :",transaction)
            if (transaction) {
                transaction.isPaymentConfirmed = true,
                transaction.transactionData = {
                    order_id,
                    razorpay_payment_id
                }
                await transaction.save();

                console.log("Payment Success")
            }
            return res.status(200).send({success:true,msg:'Payement Confirmed',data:transaction})
        }
        return res.status(400).send({success:false,msg:'Payment validation failed'})
    }
    catch(error)
    {
        console.log(error)
        return res.send({success:false,msg:'Internal Server Error',error})
    }
}

module.exports = { verifyPayment, registerOrder ,verifyPaymentAlternate};
