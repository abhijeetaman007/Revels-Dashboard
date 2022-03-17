const User = require("../../models/User");
const College = require("../../models/College");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { mailer } = require("../../utils/mailer");
const Role = require("../../models/Role");

const userRegister = async (req, res) => {
  try {
    console.log("Register User route");
    let {
      name,
      email,
      password,
      mobileNumber,
      registrationNumber,
      course,
      college,
      state,
    } = req.body;
    console.log(req.body);
    let collegeExists = await College.findOne({ name: college }, { isMahe: 1 });
    if (!collegeExists) {
      return res
        .status(400)
        .send({ success: false, msg: "College Not allowed" });
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
        .send({ success: false, msg: "User already exists." });
    }

    let isMahe = collegeExists.isMahe;
    if (college == "Manipal Institute of Technology") {
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
        expiresIn: "3d",
      }
    );

    let verified = "UNVERIFIED";
    if (isMahe) verified = "VERIFIED";

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
      return res.status(500).send({ success: false, msg: "Role Not Created" });

    const newUser = new User({
      name,
      userID,
      email,
      password,
      mobileNumber,
      registrationNumber,
      course,
      college: college,
      state,
      isMahe,
      verified,
      role: role._id,
      passwordResetToken,
    });
    await newUser.save();
    let message = `Please Click to verify http://localhost:5000/api/user/verify/${passwordResetToken}`;
    mailer(newUser.email, "Verify Email - REVELS '22", message);

    return res.status(200).send({ success: true, msg: "User Registered" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const resendVerificationLink = async (req, res) => {
  try {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))
      return res
        .status(400)
        .send({ success: false, msg: "Please enter a valid email" });

    let user = await User.exists({
      email: req.body.email,
      isEmailVerified: false,
    });
    if (!user)
      return res.status(400).send({
        success: false,
        msg: "Email already verified or Inavlid Email",
      });
    const passwordResetToken = jwt.sign(
      { userEmail: req.body.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );
    await User.updateOne(
      { email: req.body.email },
      { $set: { passwordResetToken } }
    );
    let message;
    if (process.env.CONFIG == "DEV") {
      message = `Please Click to verify http://localhost:${process.env.PORT}/api/user/verify/${passwordResetToken}`;
      res.status(200).send({ success: true, msg: "Email Resent" });
    } else if (process.env.CONFIG == "PROD") {
      message = `Please Click to verify ${process.env.API_URL}/api/user/verify/${passwordResetToken}`;
    }
    mailer(req.body.email, "Verify Email - REVELS '22", message);
    return 0;
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
};

const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne(
      { email },
      { password: 1, role: 1, isEmailVerified: 1 }
    );
    if (!user)
      return res
        .status(401)
        .send({ success: false, msg: "Invalid Credentials" });
    if (!user.isEmailVerified)
      return res
        .status(403)
        .send({ success: false, msg: "Please Verify Email to login" });
    let passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      return res
        .status(401)
        .send({ success: false, msg: "Invalid Credentials" });

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
    ).select({ password: 0 });
    res.status(200).send({
      success: true,
      msg: "Login Successful",
      data: { token, user },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
const userLogout = async (req, res) => {
  try {
    let token = req.headers["authorization"];
    let user = await User.exists({ token });
    if (!user)
      return res.status(400).send({ success: false, msg: "User not LoggedIn" });
    await User.updateOne({ token }, { $set: { token: null } });
    res.status(200).send({
      success: true,
      msg: "Successfully LoggedOut",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const userEmailVerify = async (req, res) => {
  try {
    let token = req.params.token;
    let user = await User.exists({ passwordResetToken: token });
    if (!user) return res.send({ success: false, msg: "Token Invalid" });
    console.log("user Email Verify");
    await User.updateOne(
      { passwordResetToken: token },
      { $set: { passwordResetToken: null, isEmailVerified: true } }
    );
    return res.send({ success: true, msg: "User Verified" });
  } catch (err) {
    console.log(err);
    return res.send({ success: false, msg: "Internal Server Error" });
  }
};

const userPassResetLink = async (req, res) => {
  try {
    let { email } = req.body;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return res
        .status(400)
        .send({ success: false, msg: "Please enter a valid email" });
    let user = await User.exists({ email });
    if (!user) {
      return res.send({
        success: false,
        msg: "User does not exists,Please register ",
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
    await User.updateOne(
      { _id: user._id },
      { $set: { passwordResetToken: token } }
    );
    // let resetLink = `${process.env.BASE_URL}forgetpass/${user.passwordResetToken}`;
    let resetLink = `${process.env.BASE_URL}forgetpass/${token}`;
    let message = `Click here to change yout password ${resetLink}`;
    res.send({ success: true, msg: "Password Reset Link emailed" });
    mailer(email, "Reset Password - REVELS '22", message);
    return 0;
  } catch (err) {
    console.log(err);
    return res.send({ success: false, msg: "Internal Server Error" });
  }
};
const userPassResetVerify = async (req, res) => {
  try {
    let { token, newPassword, email } = req.body;
    let user = await User.exists({ email }, { passwordResetToken: 1 });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, msg: "Email Not Registered" });
    }
    if (newPassword.length < 8) {
      return res.status(400).send({
        success: false,
        msg: "Password of minimum 8 characters is required",
      });
    }
    if (user.passwordResetToken != token) {
      return res.status(400).send({
        success: false,
        msg: "Password Reset Failed",
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
      msg: "Password Changed Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.send({ success: false, msg: "Internal Server Error" });
  }
};

const getUserFromToken = async (req, res) => {
  try {
    let user = req.requestUser;
    if (user) return res.send({ success: true, data: user });
    else return res.status(400).send({ success: false, data: "Invalid Token" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
};

const updateAccommodation = async (req, res) => {
  try {
    let { required, arrivalDateTime } = req.body;
    let user = req.requestUser;
    // MIT not allowed to apply
    if (user.isMahe != 1) {
      return res.status(400).send({
        success: false,
        msg: "Accomodation only for Outside Participants",
      });
    }
    // Already Applied
    if (user.accommodation.required) {
      return res
        .status(200)
        .send({ success: true, msg: "Already applied for Accommodation" });
    }
    if (!required) {
      arrivalDateTime = null;
    }
    await User.updateOne(
      { _id: req.requestUser._id },
      {
        $set: {
          required: true,
          arrivalDateTime,
        },
      }
    );
    return res
      .status(200)
      .send({ success: true, msg: "Accommodation Status Updated" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ success: false, msg: "Internal Server Error" });
  }
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
};
