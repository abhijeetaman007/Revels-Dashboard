const { check, validationResult } = require('express-validator');
const User = require('../models/User');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {
    try {
        console.log('register User route');
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
        });
        await newUser.save();
        res.status(200).send({ success: true, message: 'User Registered' });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
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
                .send({ success: false, message: 'Invalid Credentials' });
        let passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches)
            return res
                .status(401)
                .send({ success: false, message: 'Invalid Credentials' });

        //Password matches generating token
        const payload = { userID: user._id, userEmail: user.email };
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        user.token = token;
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Login Successful',
            data: token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
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
                .send({ success: false, message: 'User not LoggedIn' });
        user.token = '';
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Successfully LoggedOut',
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

module.exports = { userRegister, userLogin, userLogout };
