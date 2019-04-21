var dbClient = require('../helpers/db_client');
var mongoose = require('mongoose');

// database connect
var db = dbClient.getDBConection();

// Create a Mongoose schema for BlackList object
var BlackListSchema = new mongoose.Schema({
    token: String,
    storedAt: { type: Date, default: Date.now }
});

// Register the schema
var BlackList = mongoose.model('BlackList', BlackListSchema);

//Add tokens to the blacklist collection
exports.add = function (accessToken, refreshToken) {
    return new Promise(function (resolve, reject) {
        BlackList.create([
            {
                token: accessToken
            },
            {
                token: refreshToken
            }
        ])
            .then(result => {
                resolve(true);
            })
            .catch(err => {
                reject(err);
            })
    });
}

//Check if token is blacklisted
exports.isBlacklisted = function (token) {
    return new Promise(function (resolve, reject) {
        let query = { token: token };
        BlackList.findOne(query).exec()
            .then(blackListItem => {
                resolve(blackListItem);
            })
            .catch(err => {
                reject(err);
            })
    })
}