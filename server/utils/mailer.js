const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
const mailer = async (to, subject, message) => {
    try {
        var smtpConfig = {
            service: 'yahoo',
            auth: {
                user: process.env.userEmail,
                pass: process.env.userPassword,
            },
        };
        var transporter = nodemailer.createTransport(smtpConfig);
        var mailOptions = {
            from: '"System Admin - Revels" <sysadrevels22@yahoo.com>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: subject, // plaintext body
            html: message, // html body
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            } else {
                console.log(info.response);
                return transport.close();
            }
        });
        console.log("Email Sent to ",to)
    } catch (error) {
        // console.log(error);
        throw error;
    }
};

module.exports = {mailer};
