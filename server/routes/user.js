var userDomain = require('../domain/user');

//api/user/register POST - register
exports.register = function (req, res, next) {
    var userData = req.body;
    userDomain.register(userData)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                res.status(500).send(err.message);
            }
        });
}

//api/user/login POST - login
exports.login = function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    userDomain.login(email, password)
        .then(data => {
            res.setHeader('Access-Token', data.accessToken);
            res.setHeader('Refresh-Token', data.refreshToken);
            res.json({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                imageUrl: data.imageUrl
            });
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                res.status(500).send(err.message);
            }
        })
}

//api/user/signin GET - first time login with validation token
exports.signin = function (req, res, next) {
    var token = req.headers['Registration-Token'] || req.headers['registration-token'];
    userDomain.signIn(token)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                res.status(500).send(err.message);
            }
        });
}

//api/user/forgot-password POST - request for new password
exports.forgotPassword = function (req, res, next) {
    var email = req.body.email;
    userDomain.forgotPassword(email)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                res.status(500).send(err.message);
            }
        });
}

//api/user/reset-password GET - request for new password
exports.resetPassword = function (req, res, next) {
    var token = req.headers['Registration-Token'] || req.headers['registration-token'];
    var password = req.body.password;
    userDomain.updatePassword(token, password)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                res.status(500).send(err.message);
            }
        });
}

//api/user/logout GET - logout user
exports.logout = function (req, res, next) {
    let accessToken = req.headers['Access-Token'] || req.headers['access-token'];
    let refreshToken = req.headers['Refresh-Token'] || req.headers['refresh-token'];
    userDomain.logout(accessToken, refreshToken)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                res.status(500).send(err.message);
            }
        });
}