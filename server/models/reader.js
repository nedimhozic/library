var dbClient = require('../helpers/db_client');
var mongoose = require('mongoose');

// database connect
var db = dbClient.getDBConection();

const GENDERS = ["M", "F"];
// Create a Mongoose schema for Reader object
var ReaderSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    dateOfBirth: Date,
    isStudent: Boolean,
    gender: {
        type: String, enum: GENDERS
    },
    rentedBooks: [{
        book: { type: mongoose.Schema.ObjectId, ref: 'Book' },
        rentedAt: Date,
        returned: Boolean,
        uuid: String
    }],
    addedAt: { type: Date },
    updatedAt: { type: Date }
});

// Register the schema
var Reader = mongoose.model('Reader', ReaderSchema, 'Reader');

//Get reader by id
exports.getById = function (id) {
    return new Promise(function (resolve, reject) {
        Reader.findOne({ _id: id })
            .populate("rentedBooks.book")
            .exec()
            .then(reader => {
                console.log(reader);
                resolve(reader);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Get all readers
exports.get = function () {
    return new Promise(function (resolve, reject) {
        Reader.find({})
            .populate("rentedBooks.book")
            .exec()
            .then(readers => {
                resolve(readers);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Get by book
exports.getByBook = function (bookId) {
    return new Promise(function (resolve, reject) {
        Reader.find({ 'rentedBooks.book': bookId }).exec()
            .then(readers => {
                resolve(readers);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Add reader
exports.add = function (readerData) {
    var reader = new Reader(readerData);
    return new Promise(function (resolve, reject) {
        reader.save()
            .then(reader => {
                resolve(reader);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Update reader
exports.update = function (readerData) {
    return new Promise(function (resolve, reject) {
        let query = { _id: readerData._id };
        readerData.rentedBooks = undefined;
        Reader.findOneAndUpdate(query, readerData, { new: true, overwrite: true }).exec()
            .then(reader => {
                resolve(reader);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Delete reader
exports.delete = function (id) {
    return new Promise(function (resolve, reject) {
        Reader.findOneAndDelete({ _id: id }).exec()
            .then(reader => {
                resolve(reader._id);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Rent book
exports.rent = function (id, bookId) {
    return new Promise(function (resolve, reject) {
        Reader.update({ _id: id }, {
            $push: {
                rentedBooks: {
                    book: bookId,
                    rentedAt: new Date(),
                    returned: false,
                    uuid: uuidv4()
                }
            }
        }).exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    });
}

//Return book = function (uuid){
exports.return = function (uuid) {
    return new Promise(function (resolve, reject) {
        Reader.update({ "rentedBooks.uuid": uuid }, { "$set": { "rentedBooks.$.returned": true } }).exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.getStatistics = function (id) {
    return new Promise(function (resolve, reject) {
        Reader.aggregate(
            [
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 }
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

exports.getActiveReaders = function () {
    return new Promise(function (resolve, reject) {
        Reader.aggregate([
            {
                "$project": {
                    "firstName": 1,
                    "lastName": 1,
                    "books": { "$size": "$rentedBooks" }
                }
            },
            {
                "$match": {
                    "books": { "$gt": 0 }
                }
            },
            { "$sort": { "books": -1 } },
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

exports.Reader = Reader;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}