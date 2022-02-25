const Admin = require('../models/Admin');
const jwt = require("jsonwebtoken");

const isAdminLoggedIn = async (req, res, next) => {
    try {
        console.log('Admin login');
        const token = req.headers['authorization'];
        console.log(token);
        if (typeof token !== 'undefined') {
            let payload = await jwt.verify(token, process.env.JWT_SECRET);
            console.log('Payload ', payload);
            if (payload) {
                console.log('id:', payload.admin_Id);
                let admin = await Admin.findById(payload.admin_Id);
                console.log('here ', admin);
                if (admin) {
                    req.requestAdmin = admin;
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
const isCategory = async(req,res,next) =>{
    try
    {
        let token = req.headers['authorization'];
        let admin = await Admin.findOne({token});
        if (admin.role != 'CATEGORY')
            return res
                .status(403)
                .send({ success: false, msg: 'Access Denied' });
        next();
    }
    catch(err)
    {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
}

const isOperations = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        let admin = await Admin.findOne({token});
        if (admin.role != 'OPERATIONS')
            return res
                .status(403)
                .send({ success: false, msg: 'Access Denied' });
        next();
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const isSysAdmin = (req, res, next) => {
    if (req.headers['authorization'] != 'sysadminisbest')
        return res
            .status(403)
            .send({ success: false, msg: 'System Admin Access Required' });
    next();
};

module.exports = { isSysAdmin,isOperations,isCategory,isAdminLoggedIn };
