var dbClient = require('../helpers/db_client');
var mongoose = require('mongoose');

// database connect
var db = dbClient.getDBConection();

// Create a Mongoose schema for Book object
var BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    author: String,
    year: Number,
    count: Number,
    rented: Number,
    totalRented: Number,
    addedAt: { type: Date },
    updatedAt: { type: Date }
});

// Register the schema
var Book = mongoose.model('Book', BookSchema, 'Book');

//Get book by id
exports.getById = function (id) {
    return new Promise(function (resolve, reject) {
        Book.findById(id).exec()
            .then(book => {
                resolve(book);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Get all book
exports.get = function () {
    return new Promise(function (resolve, reject) {
        Book.find({}).exec()
            .then(books => {
                resolve(books);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Add book
exports.add = function (bookData) {
    var book = new Book(bookData);
    return new Promise(function (resolve, reject) {
        book.save()
            .then(book => {
                resolve(book);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Update book
exports.update = function (bookData) {
    return new Promise(function (resolve, reject) {
        let query = { _id: bookData._id };
        var book = new Book(bookData);
        Book.findOneAndUpdate(query, book, { new: true }).exec()
            .then(book => {
                resolve(book);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Update book/rent
exports.rent = function (id, inc) {
    let query = { _id: id };
    Book.update(query, { $inc: { rented: inc, totalRented: inc == 1 ? 1 : 0 } }, function (err) {
        if (err) throw err;
    });
}

//Delete book
exports.delete = function (id) {
    return new Promise(function (resolve, reject) {
        Book.findOneAndDelete({ _id: id }).exec()
            .then(book => {
                resolve(book._id);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.getStatistics = function (id) {
    return new Promise(function (resolve, reject) {
        Book.aggregate(
            [
                {
                    $group:
                    {
                        _id: null,
                        copies: { $sum: "$count" },
                        count: { $sum: 1 },
                        rented: { $sum: "$rented" }
                    }

                }
            ]
        )
            .exec()
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.getMostRented = function () {
    return new Promise(function (resolve, reject) {
        Book.aggregate([
            {
                "$match": {
                    "totalRented": { "$gt": 0 }
                }
            },
            {
                "$project": {
                    "name": 1,
                    "author": 1,
                    "totalRented": 1
                }
            },
            { "$sort": { "totalRented": -1 } },
            { "$limit": 10 }
        ])
            .exec()
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    });
}

exports.Book = Book;