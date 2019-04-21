var User = require('../models/user');
var BlackList = require('../models/blacklist');

var bcrypt = require('bcryptjs');
var jwtManager = require('../helpers/jwt_manager');
var Status = require('../helpers/http_status');
var mailer = require('../helpers/mail_manager');

//Create token based on user data and send email
exports.register = function (userData) {
    return new Promise(function (resolve, reject) {
        if (!userData.uniqueId ||
            !userData.firstName ||
            !userData.lastName ||
            !userData.email ||
            !userData.password) {
            let error = {
                status: Status.BAD_REQUEST,
                message: 'Missing fields'
            }
            reject(error);
            return;
        }
        if (userData.uniqueId != '123456') {
            let error = {
                status: Status.BAD_REQUEST,
                message: 'Invalid Unique ID'
            }
            reject(error);
            return;
        }
        var salt = bcrypt.genSaltSync(10);
        userData.password = bcrypt.hashSync(userData.password, salt);
        User.getUserByEmail(userData.email)
            .then(user => {
                if (user) {
                    let error = {
                        status: Status.CONFLICT,
                        message: 'User already exists',
                    }
                    reject(error);
                    return;
                }
                let token = jwtManager.getToken(userData);
                mailer.sendConfirmEmail(userData.email, token).then(() => { }).catch(err => { });
                resolve({ success: true });
            })
            .catch(err => {
                let error = {
                    status: Status.INTERNAL_SERVER_ERROR,
                    message: err,
                }
                reject(error);
            });
    });
};


//First time login after registration
exports.signIn = function (token) {
    return new Promise((resolve, reject) => {
        jwtManager.checkToken(token)
            .then(decoded => {
                let userData = decoded.data;
                if (userData) {
                    User.saveUser(userData)
                        .then(createdUser => {
                            resolve({ success: true });
                        })
                        .catch(err => {
                            let error = {
                                status: Status.INTERNAL_SERVER_ERROR,
                                message: err,
                            }
                            reject(error);
                        });
                } else {
                    let error = {
                        status: Status.UNAUTHORIZED,
                        message: 'Invalid token'
                    };
                    reject(error);
                }
            }).catch(err => {
                let error = {
                    status: Status.UNAUTHORIZED,
                    message: 'Token expired'
                };
                reject(error);
            })
    });
}


//Login user
exports.login = function (email, password) {
    return new Promise((resolve, reject) => {
        if (!email || !password) {
            let error = {
                status: Status.BAD_REQUEST,
                message: 'Bad data'
            };
            reject(error);
            return;
        }
        User.getUserByEmail(email).then(userData => {
            if (userData) {
                let isMatch = bcrypt.compareSync(password, userData.password)
                if (!isMatch) {
                    let error = {
                        status: Status.UNAUTHORIZED,
                        message: 'Invalid password'
                    };
                    reject(error);
                } else {
                    let accessToken = jwtManager.getToken(userData);
                    let refreshToken = jwtManager.getRefreshToken(userData);
                    let returnData = {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        email: userData.email,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        imageUrl: userData.imageUrl
                    }
                    resolve(returnData);
                }
            } else {
                let error = {
                    status: Status.UNAUTHORIZED,
                    message: 'Invalid email'
                };
                reject(error);
            }
        }).catch(err => {
            let error = {
                status: Status.INTERNAL_SERVER_ERROR,
                message: err,
            }
            reject(error);
        });
    });
}

//Create token based on user data and send email for reset password
exports.forgotPassword = function (email) {
    return new Promise(function (resolve, reject) {
        if (!email) {
            let error = {
                status: Status.BAD_REQUEST,
                message: 'Missing fields'
            }
            reject(error);
            return;
        }

        User.getUserByEmail(email)
            .then(user => {
                if (!user) {
                    let error = {
                        status: Status.CONFLICT,
                        message: "User doesn't exist",
                    }
                    reject(error);
                    return;
                }
                let token = jwtManager.getToken(user);
                mailer.sendResetPasswordEmail(email, token).then(() => { }).catch(err => { });
                resolve({ success: true, email: email });
            })
            .catch(err => {
                let error = {
                    status: Status.INTERNAL_SERVER_ERROR,
                    message: err,
                }
                reject(error);
            });
    });
};

//Extract token and update password
exports.updatePassword = function (token, newPassword) {
    return new Promise(function (resolve, reject) {
        if (!newPassword) {
            let error = {
                status: Status.BAD_REQUEST,
                message: 'Missing fields'
            }
            reject(error);
            return;
        }
        jwtManager.checkToken(token)
            .then(decoded => {
                let userData = decoded.data;
                if (userData) {
                    var salt = bcrypt.genSaltSync(10);
                    newPassword = bcrypt.hashSync(newPassword, salt);
                    User.updatePassword(userData._id, newPassword)
                        .then(data => {
                            resolve({ success: true });
                        })
                        .catch(err => {
                            let error = {
                                status: Status.INTERNAL_SERVER_ERROR,
                                message: err,
                            }
                            reject(error);
                        });
                } else {
                    let error = {
                        status: Status.UNAUTHORIZED,
                        message: 'Invalid token'
                    };
                    reject(error);
                }
            }).catch(err => {
                let error = {
                    status: Status.UNAUTHORIZED,
                    message: 'Token expired'
                };
                reject(error);
            })
    });
};

//Logout user
exports.logout = function (accessToken, refreshToken) {
    return new Promise((resolve, reject) => {
        BlackList.add(accessToken, refreshToken)
        then(data => {
            resolve({success: true});
        })
            .catch(err => {
                let error = {
                    status: Status.INTERNAL_SERVER_ERROR,
                    message: err
                };
                reject(error);
            });
    });
}
