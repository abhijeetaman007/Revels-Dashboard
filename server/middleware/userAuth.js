const User = require('../models/User');
var jwt = require('jsonwebtoken');

const isUserLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        console.log('token', token);
        let payload;
        if (typeof token !== 'undefined') {
            try {
                payload = await jwt.verify(token, process.env.JWT_SECRET);
            } catch (err) {
                return res.status(401).send({
                    success: false,
                    msg: 'Invalid Token',
                });
            }
            console.log('Payload ', payload);
            if (payload) {
                let user = await User.findById(payload.userID);
                if (user) {
                    if (user.token === token && user.isEmailVerified) {
                        req.requestUser = user;
                        console.log('we are here 123 ', req.requestUser);
                        next();
                    } else {
                        return res.status(400).send({
                            success: false,
                            msg: !user.isEmailVerified ? 'Please verify Email to login' : 'Access Denied',
                        });
                    }
                } else {
                    return res.status(401).send({
                        success: false,
                        msg: 'Token Invalid,Please Login',
                    });
                }
            } else {
                return res.status(401).send({
                    success: false,
                    msg: 'Token Expired,Please Login Again',
                });
            }
        } else {
            return res.status(401).send({
                success: false,
                msg: 'Token Invalid,Please Login',
            });
        }
    } catch (err) {
        console.log(err);
        if (err.name == 'TokenExpiredError') {
            console.log('Token Expired');
            return res.send({
                success: false,
                msg: 'Token Expired,Please Login Again',
            });
        }
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const isEmailVerified = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(400)
                .send({ success: false, msg: 'User not found' });
        if (!user.isEmailVerified)
            return res
                .status(400)
                .send({ success: false, msg: 'Please Verify Email to login' });
        next();
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const isVerifiedForRevels = async (req, res, next) => {
    try {
        console.log('Status :', req.requestUser.verified);
        if (req.requestUser.verified == 'UNVERIFIED')
            return res.status(400).send({
                success: false,
                msg: 'You are not yet verified,wait until Outstation Management Team verifies',
            });
        if (req.requestUser.verified == 'REJECTED')
            return res.status(400).send({
                success: false,
                msg: 'You are verification is rejected,Please update your drive link with correct Documents',
            });
        if (req.requestUser.verified == 'BANNED')
            return res.status(400).send({
                success: false,
                msg: 'You are banned from revels,contact Student Council or System Admin Team for more details',
            });
        
        next();
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { isUserLoggedIn, isEmailVerified, isVerifiedForRevels };
