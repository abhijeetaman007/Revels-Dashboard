// Access Level Middleware:(All Portals)
// - hasReadAccess
// - hasReadWriteAccess
// - hasCategorySuperAdminAccess
// - hasSuperAdminAccess

const User = require('../models/User');

const hasReadAccess = async (req, res, next) => {
    try {
        let user = req.requestAdmin;
        if (user.role.accessLevel >= 1) next();
        else {
            return res
                .status(403)
                .send({ success: false, msg: 'Access Denied' });
        }
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const hasReadWriteAccess = async (req, res, next) => {
    try {
        let user = req.requestAdmin;
        if (user.role.accessLevel >= 2) next();
        else {
            return res
                .status(403)
                .send({ success: false, msg: 'Access Denied' });
        }
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const hasCategorySuperAdminAccess = async (req, res, next) => {
    try {
        let user = req.requestAdmin;
        if (user.role.accessLevel >= 3) next();
        else {
            return res
                .status(403)
                .send({ success: false, msg: 'Access Denied' });
        }
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const hasSuperAdminAccess = async (req, res, next) => {
    try {
        let user = req.requestAdmin;
        if (user.role.accessLevel >= 4) next();
        else {
            return res
                .status(403)
                .send({ success: false, msg: 'Access Denied' });
        }
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = {
    hasReadAccess,
    hasReadWriteAccess,
    hasCategorySuperAdminAccess,
    hasSuperAdminAccess,
};
