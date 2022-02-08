const User = require('../models/User');
var jwt = require('jsonwebtoken');

const isUserLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (typeof token !== 'undefined') {
            let payload = await jwt.verify(token, process.env.JWT_SECRET);
            console.log('Payload ', payload);
            if (!payload) {
                return res.status(400).send({
                    success: false,
                    message: 'Token Invalid, Please Login',
                });
            }
            let user = await User.findOne({ token });
            if (!user) {
                return res.status(403).send({
                    success: false,
                    message: 'Token Invalid,Please Login',
                });
            }
            req.token = token;
            req.requestUser = user;
            next();
        } else {
            res.status(403).send({
                success: false,
                message: 'Token Invalid,Please Login',
            });
        }
    } catch (err) {
        console.log(err);
        if (err.name == 'TokenExpiredError') {
            console.log('Token Expired');
            res.send({
                success: false,
                msg: 'Token Expired,Please Login Again',
            });
        }
        return res.status(500).send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = { isUserLoggedIn };
