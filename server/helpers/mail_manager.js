var nodemailer = require('nodemailer');
var config = require('../config');

//Send confirm registration email
exports.sendConfirmEmail = function (email, token) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email,
                pass: config.password
            }
        });
        var loginUrl = 'http://localhost:4200/user/login?token=' + token;
        const mailOptions = {
            from: config.email,
            to: email,
            subject: 'Confirm Your Account - Library',
            html: '<div style="text-align:center"><h2>Thank You for registration to our Library!</h2><h4>Confirm Your account <a href="' + loginUrl + '">here</a></h4></div>'
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

//Send reset password email
exports.sendResetPasswordEmail = function (email, token) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email,
                pass: config.password
            }
        });
        var resetUrl = 'http://localhost:4200/user/reset-password?token=' + token;
        const mailOptions = {
            from: config.email,
            to: email,
            subject: 'Reset Password - Library',
            html: '<div style="text-align:center"><h2>Reset Password</h2><h4>Click <a href="' + resetUrl + '">here</a></h4></div>'
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}