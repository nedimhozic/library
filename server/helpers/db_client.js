'use strict'

var mongoose = require('mongoose');
var config = require('../config.js');

var db;

//Create connection
exports.DBConnect = function() {
    return new Promise(function(resolve, reject) {
        if (db) {
            return db;
        }
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://' + config.connectionString, { useNewUrlParser: true, useFindAndModify: false })
            .then(database => {
                console.log('db connection created');
                db = database;
                resolve(db);
            })
            .catch(err => {
                console.log('error creating db connection: ' + err);
                reject(db);
            });
    });
};

//Get created connection
exports.getDBConection = function () {
    if (db) {
        return db;
    }

    console.log('There is no db connection');
    return null;
}