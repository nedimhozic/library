var dbClient = require('../helpers/db_client');
var mongoose = require('mongoose');

// database connect
var db = dbClient.getDBConection();

// Create a Mongoose schema for User object
var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now }
});

// Register the schema
var User = mongoose.model('User', UserSchema, 'User');

//Save user
exports.saveUser = function (userData) {
    var user = new User(userData);
    return new Promise(function (resolve, reject) {
        user.save()
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Update password
exports.updatePassword = function (id, password) {
    return new Promise(function (resolve, reject) {
        User.update({ _id: id }, { $set: { 'password': password } }).exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Get user by email
exports.getUserByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        let query = { email: email };
        User.findOne(query).exec()
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.User = User;