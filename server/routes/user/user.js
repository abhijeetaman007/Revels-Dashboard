const User = require('../../models/User');
const College = require('../../models/College')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { mailer } = require('../../utils/mailer');

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
            state
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

        college = await College.findOne({name:college})
        if(!college)
        {
            return res.status(400).send({success:false,msg:'College Not allowed'})
        }
        let isMahe = college.isMahe
        let isMIT = false
        if (isMahe) {
            user = await User.findOne({ registrationNumber });
            if (user) {
                return res.status(400).send({
                    success: false,
                    msg: 'Registration Number already exists',
                });
            }
        }

        console.log(college.name)
        if(college.name == "Manipal Institute of Technology")
        {
            isMIT = true
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
                expiresIn: '365d',
            }
        );
        
        let verified = 'UNVERIFIED';
        if (isMIT) verified = 'VERIFIED';

        const date = new Date();
        offset = (60 * 5 + 30) * 60 * 1000;
        var ISTTime = new Date(date.getTime() + offset);
        timeStamp = ISTTime;
        const newUser = new User({
            name,
            userID,
            email,
            password,
            mobileNumber,
            registrationNumber,
            branch,
            college:college.name,
            state,
            isMahe,
            isMIT,
            verified,
            passwordResetToken,
            timeStamp,
        });
        await newUser.save();
        let message = `Please Click to verify ${BASE_URL}/api/user/verify/${passwordResetToken}`;
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

const resendVerificationLink = async (req, res) => {
    try {
        if (
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                req.body.email
            )
        )
            return res
                .status(400)
                .send({ success: false, msg: 'Please enter a valid email' });
        let user = await User.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(400)
                .send({ success: false, msg: 'Email doesnot exists' });
        // let message = `Please Click to verify http://localhost:${process.env.PORT}/api/user/verify/${user.passwordResetToken}`;
        let message = `Please Click to verify https://revels22-api.herokuapp.com/api/user/verify/${user.passwordResetToken}`;

        mailer(user.email, "Verify Email - REVELS '22", message);
        return res.status(200).send({ success: true, msg: 'Email Resent' });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send({ success: false, msg: 'Internal Server Error' });
    }
};

const userLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
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
        let token = req.params.token;
        let user = await User.findOne({ passwordResetToken: token });
        if (!user) return res.send({ success: false, msg: 'Token Invalid' });
        let newToken = jwt.sign(
            { userEmail: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: '365d',
            }
        );
        user.passwordResetToken = newToken;
        user.isEmailVerified = true;
        await user.save();
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
        let user = await User.findOne({ email });
        if (!user) {
            return res.send({
                success: false,
                msg: 'User does not exists,Please register ',
            });
        }
        // let resetLink = `${process.env.BASE_URL}forgetpass/${user.passwordResetToken}`;
        let resetLink = `${process.env.BASE_URL}forgetpass/${user.passwordResetToken}`;
        
        let message = `Click here to change yout password ${resetLink}`;
        mailer(email, "Reset Password - REVELS '22", message);
        return res.send({ success: true, msg: 'Password Reset Link emailed' });
    } catch (err) {
        console.log(err);
        return res.send({ success: false, msg: 'Internal Server Error' });
    }
};
const userPassResetVerify = async (req, res) => {
    try {
        let { token, newPassword, email } = req.body;
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
        await user.save();
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
        if (user) return res.send({ success: true, data: user });
        else
            return res
                .status(400)
                .send({ success: false, data: 'Invalid Token' });
    } catch (error) {
        return res
            .status(500)
            .send({ success: false, message: 'Internal Server Error' });
    }
};

// const updateDriveLink = async (req, res) => {
//     try {
//         if (!req.body.driveLink) {
//             return res
//                 .status(400)
//                 .send({ success: false, msg: 'Drive Link Empty' });
//         }
//         let user = await User.findOneAndUpdate(
//             { _id: req.requestUser._id },
//             {
//                 driveLink: req.body.driveLink,
//             }
//         );
//         return res.status(200).send({
//             success: true,
//             msg: 'Drive Link Updated,Wait until OutStation Management Team verifies',
//         });
//     } catch (err) {
//         console.log(err);
//         return res
//             .status(500)
//             .send({ success: false, msg: 'Update dive link failed' });
//     }
// };
const updateAccommodation = async (req, res) => {
    try {
        let { isRequired,arrivalDate,arrivalTime } = req.body;
        let user = req.requestUser;
        if (!isRequired)
            return res
                .status(200)
                .send({ success: true, msg: 'Accommodation Status Updated' });
        if (user.isMahe) {
            return res
                .status(400)
                .send({
                    success: false,
                    msg: 'Accomodation only for Non-Mahe Users',
                });
        }
        if (!isRequired) {
            user.accommodation.required = isRequired
        } else {
            user.accommodation.required = isRequired
            user.accommodation.arrivalDate = arrivalDate,
            user.accommodation.arrivalTime = arrivalTime
        }
        await user.save();
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
