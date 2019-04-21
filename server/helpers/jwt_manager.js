var jwt = require('jsonwebtoken');
var config = require('../config');

//Check if token is valid
exports.checkToken = function (token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject('Missing token');
        }
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                reject('Invalid token');
            } else {
                resolve(decoded);
            }
        });
    });
}

//Generate token based on data
exports.getToken = function (data, duration) {
    var tokenDuration = '1h';
    if (duration) {
        tokenDuration = duration;
    }
    return jwt.sign({
        data: data
    }, config.tokenSecret, { expiresIn: tokenDuration });
}

//Get data from token
exports.getData = function (token) {
    return jwt.verify(token, config.tokenSecret);
}

//Get refresh token without expiration
exports.getRefreshToken = function (data) {
    return jwt.sign({
        data: data
    }, config.refreshTokenSecret);
}

//Get data from refresh token
exports.getRefreshTokenData = function (token) {
    return jwt.verify(token, config.refreshTokenSecret);
}