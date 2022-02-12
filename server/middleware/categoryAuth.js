const Category = require('../models/Category');
var jwt = require('jsonwebtoken');

const isCategoryLoggedIn = async (req, res, next) => {
    try {
        console.log("Category login")
        const token = req.headers['authorization'];
        console.log(token)
        if (typeof token !== 'undefined') {
            let payload = await jwt.verify(token, process.env.JWT_SECRET);
            console.log('Payload ', payload);
            if (payload) {
                console.log('id:', payload.category_Id);
                let category = await Category.findById(payload.category_Id);
                console.log('here ', category);
                if (category) {
                    req.requestCategory = category;
                    next();
                } else {
                    return res.status(401).send({
                        success: false,
                        msg: 'Token Invalid,Please Login',
                    });
                }
            } else {
                return res.status(401).send({
                    success: false,
                    msg: 'Token Expired,Please Login',
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

module.exports = { isCategoryLoggedIn };
