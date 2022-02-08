const User = require('../models/User');

const isUserLoggedIn = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (typeof token !== 'undefined') {
        let user = await User.findOne({ token });
        if (!user)
            return res
                .Status(403)
                .send({
                    success: false,
                    message: 'Token Invalid,Please Login',
                });
        req.token = token;
        req.requestUser = user;
        next();
    } else {
        res.Status(403).send({
            success: false,
            message: 'Token Invalid,Please Login',
        });
    }
};

module.exports = { isUserLoggedIn };
