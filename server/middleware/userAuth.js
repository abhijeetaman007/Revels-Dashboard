const User = require('../models/User');
var jwt = require('jsonwebtoken');

const isUserLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (typeof token !== 'undefined') {
            let payload = await jwt.verify(token, process.env.JWT_SECRET);
            console.log('Payload ', payload);
            if (payload) {
                let user = await User.findById(payload.userID);
                if (user) {
                    if (user.isEmailVerified) {
                        req.requestUser = user;
                        next();
                    }
                    return res.status(400).send({
                        success: false,
                        msg: 'Please verify Email to login',
                    });
                }
            }
        }
        return res.status(403).send({
            success: false,
            msg: 'Token Invalid,Please Login',
        });
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

const isSC = async (req, res, next) => {
    try {
        if (req.requestUser.role == 'SC') next();
        return res.send({ success: false, msg: 'Access Denied' });
    } catch (err) {
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { isUserLoggedIn };
