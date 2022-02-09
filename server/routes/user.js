const { check, validationResult } = require('express-validator');
const User = require('../models/User');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
            process.env.JWT_SECRET
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
        res.status(200).send({ success: true, msg: 'User Registered' });
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
        res.status(200).send({
            success: true,
            msg: 'Login Successful',
            data: token,
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

module.exports = { userRegister, userLogin, userLogout };
