const User = require('../../models/User');
const College = require('../../models/College');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { mailer } = require('../../utils/mailer');
const Role = require('../../models/Role');
const { File } = require('../../models/file');
const { doUpload } = require('../../utils/file-upload/upload-controller');
const { emailTemplate } = require('../../utils/template');
const { sendEmailNotif, sendENotif } = require('../../utils/ses');

const userRegister = async (req, res) => {
  try {
    console.log('Register User route');
    let {
      name,
      email,
      password,
      mobileNumber,
      registrationNumber,
      course,
      college,
    } = req.body;
    console.log(req.body);
    let collegeExists = await College.findOne({ name: college }, { isMahe: 1 });
    if (!collegeExists) {
      return res
        .status(400)
        .send({ success: false, msg: 'College Not allowed' });
    }
    // let isMahe = college.isMahe
    // let isMIT = false

    //     const condn =
    //     user = await User.findOne({ registrationNumber });
    //     if (user) {
    //         return res.status(400).send({
    //             success: false,
    //             msg: 'Registration Number already exists',
    //         });
    //     }

    let user = await User.exists({
      $or: [
        { email },
        { mobileNumber },
        { $and: [{ registrationNumber }, { college }] },
      ],
    });
    if (user) {
      return res
        .status(400)
        .send({ success: false, msg: 'User already exists.' });
    }

    let isMahe = collegeExists.isMahe;
    if (college == 'MANIPAL INSTITUTE OF TECHNOLOGY') {
      isMahe = 1;
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let ids = await User.find({}, { userID: 1, _id: 0 })
      .sort({ userID: -1 })
      .limit(1);
    let userID = 1001;
    if (ids[0]) {
      userID = ids[0].userID + 1;
    }

    const passwordResetToken = jwt.sign(
      { userEmail: email },
      process.env.JWT_SECRET,
      {
        expiresIn: '3d',
      }
    );

    let verified = 'UNVERIFIED';
    if (isMahe) verified = 'VERIFIED';

    // const date = new Date();
    // offset = (60 * 5 + 30) * 60 * 1000;
    // var ISTTime = new Date(date.getTime() + offset);
    // timeStamp = ISTTime;
    // TODO: replace this with hardcoded id
    let role = await Role.findOne({
      type: 0,
      accessLevel: 0,
      categoryId: null,
    });
    if (!role)
      return res.status(500).send({ success: false, msg: 'Role Not Created' });

    const newUser = new User({
      name,
      userID,
      email,
      password,
      mobileNumber,
      registrationNumber,
      course,
      college: college,
      // state,
      isMahe,
      status: verified,
      role: role._id,
      passwordResetToken,
    });
    await newUser.save();
    message = `Please Click to verify \n${process.env.FRONT_END_URL}verify/${passwordResetToken} \nRegards,\nSystem Admin - Aagaz | Revels '22`;
    html = emailTemplate(
      newUser.name,
      'Please click the below to verify your account.',
      `${process.env.FRONT_END_URL}verify/${passwordResetToken}`,
      'Verify'
    );

    res.status(200).send({ success: true, msg: 'User Registered' });
    sendENotif(newUser.email, 'Email Verification Revels', message);
    sendEmailNotif(newUser.email, 'Email Verification Revels', html, message);
    return 0;
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

const resendVerificationLink = async (req, res) => {
  try {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))
      return res
        .status(400)
        .send({ success: false, msg: 'Please enter a valid email' });

    let user = await User.exists({
      email: req.body.email,
      isEmailVerified: false,
    });
    if (!user)
      return res.status(400).send({
        success: false,
        msg: 'Email already verified or Inavlid Email',
      });
    const passwordResetToken = jwt.sign(
      { userEmail: req.body.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '3d',
      }
    );
    const userDetails = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { passwordResetToken } }
    );
    message = `Please Click to verify ${process.env.FRONT_END_URL}verify/${passwordResetToken}`;
    html = emailTemplate(
      userDetails.name,
      'Please click the below button to verify your account.',
      `${process.env.FRONT_END_URL}verify/${passwordResetToken}`,
      'Verify'
    );
    res.status(200).send({ success: true, msg: 'Email Resent' });
    sendEmailNotif(req.body.email, 'Email Verification Revels', html, message);
    sendENotif(req.body.email, 'Email Verification Revels', message);
    return 0;
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: 'Internal Server Error' });
  }
};

const userLogin = async (req, res) => {
  try {
    console.log('User Login');
    let { email, password } = req.body;
    let user = await User.findOne(
      { email },
      { password: 1, role: 1, isEmailVerified: 1 }
    );
    if (!user)
      return res
        .status(401)
        .send({ success: false, msg: 'Invalid Credentials' });
    if (!user.isEmailVerified)
      return res
        .status(403)
        .send({ success: false, msg: 'Please Verify Email to login' });
    let passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      return res
        .status(401)
        .send({ success: false, msg: 'Invalid Credentials' });

    //Password matches,generating token
    const payload = {
      userID: user._id,
      userEmail: email,
      userRole: user.role,
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 1 * 60 * 60,
    });
    user = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { token } },
      { new: true }
    )
      .select({ password: 0 })
      .populate('delegateCards role');
    res.status(200).send({
      success: true,
      msg: 'Login Successful',
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};
const userLogout = async (req, res) => {
  try {
    let token = req.headers['authorization'];
    let user = await User.exists({ token });
    if (!user)
      return res.status(400).send({ success: false, msg: 'User not LoggedIn' });
    await User.updateOne({ token }, { $set: { token: null } });
    res.status(200).send({
      success: true,
      msg: 'Successfully LoggedOut',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

const userEmailVerify = async (req, res) => {
  try {
    let token = req.params.token;
    let user = await User.findOne({ passwordResetToken: token }, { isMahe: 1 });
    if (!user) return res.send({ success: false, msg: 'Token Invalid' });
    if (user.isMahe != 0) {
      await User.updateOne(
        { passwordResetToken: token },
        {
          $set: {
            passwordResetToken: null,
            isEmailVerified: true,
            status: 'VERIFIED',
          },
        }
      );
    } else {
      await User.updateOne(
        { passwordResetToken: token },
        { $set: { passwordResetToken: null, isEmailVerified: true } }
      );
    }
    return res.send({ success: true, msg: 'User Verified' });
  } catch (err) {
    console.log(err);
    return res.send({ success: false, msg: 'Internal Server Error' });
  }
};

const userPassResetLink = async (req, res) => {
  try {
    let { email } = req.body;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return res
        .status(400)
        .send({ success: false, msg: 'Please enter a valid email' });
    let user = await User.exists({ email });
    if (!user) {
      return res.send({
        success: false,
        msg: 'User does not exists,Please register ',
      });
    }
    const payload = {
      userID: user._id,
      userEmail: email,
      userRole: user.role,
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 1 * 60 * 60,
    });
    const userDetails = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { passwordResetToken: token } }
    );
    // let resetLink = `${process.env.BASE_URL}forgetpass/${user.passwordResetToken}`;
    let resetLink = `${process.env.FRONT_END_URL}forgetpass/${token}`;
    let message = `Click here to change yout password ${resetLink}`;
    html = emailTemplate(
      userDetails.name,
      'Please click below to reset your account password.',
      resetLink,
      'Reset Password'
    );
    res.send({ success: true, msg: 'Password Reset Link emailed' });
    sendEmailNotif(email, 'Revels Reset Password', html, message);
    sendENotif(email, 'Revels Reset Password', message);
    return 0;
  } catch (err) {
    console.log(err);
    return res.send({ success: false, msg: 'Internal Server Error' });
  }
};
const userPassResetVerify = async (req, res) => {
  try {
    let { newPassword } = req.body;
    let { token } = req.query;
    let user = await User.findOne({ passwordResetToken: token });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, msg: 'Email Not Registered' });
    }
    if (newPassword.length < 8) {
      return res.status(400).send({
        success: false,
        msg: 'Password of minimum 8 characters is required',
      });
    }
    if (user.passwordResetToken != token) {
      return res.status(400).send({
        success: false,
        msg: 'Password Reset Failed',
      });
    }
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);
    await User.updateOne(
      { _id: user._id },
      { $set: { passwordResetToken: null, password: newPassword } }
    );
    return res.send({
      success: true,
      msg: 'Password Changed Successfully',
    });
  } catch (err) {
    console.log(err);
    return res.send({ success: false, msg: 'Internal Server Error' });
  }
};

const getUserFromToken = async (req, res) => {
  try {
    let user = req.requestUser;
    console.log('user', user);
    if (user) return res.send({ success: true, data: user });
    else return res.status(400).send({ success: false, data: 'Invalid Token' });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: 'Internal Server Error' });
  }
};

const updateAccommodation = async (req, res) => {
  try {
    console.log(
      'checking accom : ' +
        req.body.required +
        ' and date ' +
        req.body.arrivalDateTime
    );
    let { required, arrivalDateTime } = req.body;
    let user = req.requestUser;
    // MIT not allowed to apply
    if (user.isMahe) {
      return res.status(400).send({
        success: false,
        msg: 'Accomodation only for Outside Participants',
      });
    }
    // Already Applied
    if (user.accommodation.required) {
      return res
        .status(200)
        .send({ success: true, msg: 'Already applied for Accommodation' });
    }
    if (!required) {
      arrivalDateTime = null;
    }
    await User.updateOne(
      { _id: req.requestUser._id },
      {
        $set: {
          accommodation: {
            arrivalDateTime,
            required,
          },
        },
      }
    );
    return res
      .status(200)
      .send({ success: true, msg: 'Accommodation Status Updated' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  console.log('updated');
  try {
    let user = req.requestUser;
    console.log(req.files.aadhar);
    const files = req.files;

    const doc = await User.findById(user._id, { documents: 1 });
    let documents = doc.documents;
    if (files.aadhar) documents.aadhar = getFile(files.aadhar[0], user);
    if (files.collegeId)
      documents.collegeId = getFile(files.collegeId[0], user);
    if (files.undertaking)
      documents.undertaking = getFile(files.undertaking[0], user);
    if (files.vaccination)
      documents.vaccination = getFile(files.vaccination[0], user);

    user = await User.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: {
          ...req.body,
          documents,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.toString(),
    });
  }
};
const getFile = (file, user) => {
  if (!file) return null;
  const randomID =
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5) + '_';
  const newFile = new File({
    fileName: file.originalname,
    url:
      'https://' +
      process.env.BUCKET +
      '.s3.amazonaws.com/users/' +
      user._id +
      '/' +
      randomID +
      file.originalname,
    type: file.mimetype,
    key: 'users/' + user._id + '/' + randomID + file.originalname,
  });
  doUpload(newFile.key, file);
  console.log(newFile);
  return newFile;
};
module.exports = {
  userRegister,
  userLogin,
  userLogout,
  resendVerificationLink,
  userEmailVerify,
  userPassResetLink,
  userPassResetVerify,
  getUserFromToken,
  updateAccommodation,
  updateUser,
};
