const User = require('../models/User');
const Admin = require('../models/Admin');
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
        let user = await User.findById(payload.userID).populate('role');
        console.log('Our User ', user);
        if (user) {
          if (user.token === token && user.isEmailVerified) {
            req.requestUser = user;
            console.log('we are here 123 ', req.requestUser);
            next();
          } else {
            return res.status(400).send({
              success: false,
              msg: !user.isEmailVerified
                ? 'Please verify Email to login'
                : 'Access Denied',
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

const isVerifiedForRevels = async (req, res, next) => {
  try {
    console.log('Status :', req.requestUser.status);
    if (req.requestUser.status == 'UNVERIFIED')
      return res.status(400).send({
        success: false,
        msg: 'You are not yet verified,wait until Outstation Management Team verifies',
      });
    if (req.requestUser.status == 'REJECTED')
      return res.status(400).send({
        success: false,
        msg: 'You are verification is rejected,Please update your drive link with correct Documents',
      });
    if (req.requestUser.status == 'BANNED')
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

const isAdminLoggedIn = async (req, res, next) => {
  try {
    console.log('is Admin login middleware');
    const token = req.headers['authorization'];
    console.log(token);
    if (typeof token !== 'undefined') {
      let payload = await jwt.verify(token, process.env.JWT_SECRET);
      console.log('Payload ', payload);
      if (payload) {
        console.log('id:', payload.admin_Id);
        let admin = await Admin.findOne({
          _id: payload.admin_Id,
          token,
        }).populate('role');
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

module.exports = { isUserLoggedIn, isVerifiedForRevels, isAdminLoggedIn };
