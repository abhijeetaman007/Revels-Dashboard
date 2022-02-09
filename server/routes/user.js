const User = require('../models/User');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { mailer } = require('../utils/mailer');

const userRegister = async (req, res) => {
    try {
        console.log('Register User route');
        let {
            name,
            email,
            password,
            mobileNumber,
            registrationNumber,
            branch,
            college,
            state,
            isMahe,
            IDCardLink,
            covidVaccinationLink,
            accommodationRequired,
        } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .send({ success: false, msg: 'Email already exists.' });
        }
        user = await User.findOne({ mobileNumber });
        if (user) {
            return res
                .status(400)
                .send({ success: false, msg: 'Mobile Number already exists.' });
        }
        user = await User.findOne({ IDCardLink });
        if (user) {
            return res.status(400).send({
                success: false,
                msg: 'ID card Link already exits,try with different link',
            });
        }
        user = await User.findOne({ covidVaccinationLink });
        if (user) {
            return res.status(400).send({
                success: false,
                msg: 'Covid Vaccination Link already exits,try with different link',
            });
        }
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const passwordResetToken = jwt.sign(
            { userEmail: email },
            process.env.JWT_SECRET,
            {
                expiresIn: '365d',
            }
        );
        const newUser = new User({
            name,
            email,
            password,
            mobileNumber,
            registrationNumber,
            branch,
            college,
            state,
            isMahe,
            IDCardLink,
            covidVaccinationLink,
            accommodationRequired,
            passwordResetToken,
        });
        await newUser.save();
        let message = `Please Click to verify http://localhost:${process.env.token}/api/user/verify/${passwordResetToken}`;
        mailer(newUser.email, "Verify Email - REVELS '22", message);

        return res.status(200).send({ success: true, msg: 'User Registered' });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            msg: 'Internal Server Error',
        });
    }
};

const userLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        console.log(user);
        if (!user)
            return res
                .status(401)
                .send({ success: false, msg: 'Invalid Credentials' });
        let passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches)
            return res
                .status(401)
                .send({ success: false, msg: 'Invalid Credentials' });

        //Password matches,generating token
        const payload = {
            userID: user._id,
            userEmail: user.email,
            userRole: user.role,
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 12 * 60 * 60,
        });
        user.token = token;
        await user.save();
        delete user['password'];
        console.log(user);
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
        let user = await User.findOne({ token });
        if (!user)
            return res
                .status(400)
                .send({ success: false, msg: 'User not LoggedIn' });
        user.token = '';
        await user.save();
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
        let token = req.params;
        let newToken = jwt.sign({ userEmail: email }, process.env.JWT_SECRET, {
            expiresIn: '365d',
        });
        await User.updateOne(
            {
                passwordResetToken: token,
            },
            {
                isEmailVerified: true,
                passwordResetToken: newToken,
            }
        );
        return res.send({ success: true, msg: 'User Verified' });
    } catch (err) {
        console.log(err);
        return res.send({ success: false, msg: 'Internal Server Error' });
    }
};

const userPassResetLink = async (req, res) => {
    try {
        let { email } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.send({
                success: false,
                msg: 'User does not exists,Please register ',
            });
        }
        let resetLink = `${process.env.BASE_URL}/forgetpass/${obj.token}/${user.passwordResetToken}`;
        let message = `Click here to change yout password ${resetLink}`;
        mailer(email, "Reset Password - REVELS '22", resetLink, message);
        return res.send({ success: true, msg: 'Password Reset Link emailed' });
    } catch (err) {
        console.log(err);
        return res.send({ success: false, msg: 'Internal Server Error' });
    }
};
const userPassResetVerify = async (req, res) => {
    try {
        let token = req.body.token;
        let newPassword = req.body.password;
        let user = await User.findOne({ email });
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
                msg: 'Invalid Token,Password cannot be changed',
            });
        }
        const salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(newPassword, salt);
        const newPasswordResetToken = jwt.sign(
            { userEmail: email },
            process.env.JWT_SECRET,
            {
                expiresIn: '365d',
            }
        );
        user.password = newPassword;
        user.passwordResetToken = newPasswordResetToken;

        return res.send({
            success: true,
            msg: 'Password Changed Successfully',
        });
    } catch (err) {
        console.log(err);
        return res.send({ success: false, msg: 'Internal Server Error' });
    }
};

module.exports = {
    userRegister,
    userLogin,
    userLogout,
    userEmailVerify,
    userPassResetLink,
    userPassResetVerify,
};
