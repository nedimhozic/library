var BlackList = require('../models/blacklist');
var Status = require('../helpers/http_status');
var jwtManager = require('../helpers/jwt_manager');

//Check token if expired, valid etc.
//Generate new token based on refresh-token if access-token is expired
exports.checkToken = function (accessToken, refreshToken) {
    return new Promise((resolve, reject) => {
        BlackList.isBlacklisted(accessToken)
            .then(data => {
                if (data) {
                    console.log('blacklisted')
                    console.log(data);
                    let err = {
                        status: Status.UNAUTHORIZED,
                        message: 'Invalid token'
                    };
                    reject(err);
                } else {
                    jwtManager.checkToken(accessToken)
                        .then(decoded => {
                            let tokens = {
                                accessToken: accessToken,
                                refreshToken: refreshToken
                            };
                            resolve(tokens);
                            return;
                        })
                        .catch(err => {
                            let refreshUserData = jwtManager.getRefreshTokenData(refreshToken).data;
                            if (refreshUserData) {
                                let newAccessToken = jwtManager.getToken(refreshUserData);
                                let newRefreshToken = jwtManager.getRefreshToken(refreshUserData);
                                let tokens = {
                                    accessToken: newAccessToken,
                                    refreshToken: newRefreshToken
                                };
                                resolve(tokens);
                            } else {
                                let error = {
                                    status: Status.UNAUTHORIZED,
                                    message: 'Invalid refresh token'
                                };
                                reject(error);
                            }
                        });
                }
            }).catch(err => {
                let error = {
                    status: Status.INTERNAL_SERVER_ERROR,
                    message: err
                };
                reject(error);
            })
    });
}