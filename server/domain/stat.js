var Book = require('../models/book');
var Reader = require('../models/reader');
var Status = require('../helpers/http_status');

exports.getStatistics = function () {
    return new Promise(function (resolve, reject) {
        Promise.all([Book.getStatistics(), Book.getMostRented(), Reader.getStatistics(), Reader.getActiveReaders()])
        .then(function (values) {
            var result = {
                books: {
                    copies: values[0][0].copies,
                    count: values[0][0].count,
                    rented: values[0][0].rented,
                    mostRented: values[1]
                },
                readers: {
                    count: values[2][0].count,
                    active: values[3]
                }
            }
            resolve(result);
        })
            .catch(err => {
                let error = {
                    status: Status.INTERNAL_SERVER_ERROR,
                    message: err,
                }
                reject(error);
            });
    })
}
