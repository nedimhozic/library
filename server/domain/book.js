var Book = require('../models/book');
var Status = require('../helpers/http_status');

exports.getById = function (id) {
    return new Promise(function (resolve, reject) {
        if (!id) {
            let error = {
                status: Status.BAD_REQUEST,
                message: 'Missing identifier'
            }
            reject(error);
            return;
        }
        Book.getById(id)
            .then(book => {
                resolve(book);
            })
            .catch(err => {
                let error = {
                    status: Status.INTERNAL_SERVER_ERROR,
                    message: err,
                }
                reject(error);
            });
    });
}

exports.get = function () {
    return new Promise(function (resolve, reject) {
        Book.get()
            .then(books => {
                resolve(books);
            })
            .catch(err => {
                let error = {
                    status: Status.INTERNAL_SERVER_ERROR,
                    message: err,
                }
                reject(error);
            });
    });
}

exports.add = function (bookData) {
    return new Promise(function (resolve, reject) {
        if (!bookData.name ||
            !bookData.author ||
            !bookData.count) {
            let error = {
                status: Status.BAD_REQUEST,
                message: 'Name, Author and Count fields are required.'
            }
            reject(error);
            return;
        }

        bookData.addedAt = new Date();
        bookData.updatedAt = new Date();
        bookData.rented = 0;

        Book.add(bookData).then(book => {
            resolve(book);
        })
            .catch(err => {
                let error = {
                    status: Status.INTERNAL_SERVER_ERROR,
                    message: err,
                }
                reject(error);
            });
    });
}

exports.update = function (id, bookData) {
    return new Promise(function (resolve, reject) {
        if (!bookData.name ||
            !bookData.author ||
            !bookData.count) {
            let error = {
                status: Status.BAD_REQUEST,
                message: 'Name, Author and Count fields are required.'
            }
            reject(error);
            return;
        }

        bookData._id = id;
        bookData.updatedAt = new Date();
        Book.update(bookData).then(book => {
            resolve(book);
        })
            .catch(err => {
                let error = {
                    status: Status.INTERNAL_SERVER_ERROR,
                    message: err,
                }
                reject(error);
            });
    });
}

exports.rent = function(bookId, inc){
    Book.rent(bookId, inc);
}

exports.delete = function (id) {
    return new Promise(function (resolve, reject) {
        if (!id) {
            let error = {
                status: Status.BAD_REQUEST,
                message: 'Identifier is required.'
            }
            reject(error);
            return;
        }
        Book.delete(id).then(id => {
            resolve(id);
        })
            .catch(err => {
                let error = {
                    status: Status.INTERNAL_SERVER_ERROR,
                    message: err,
                }
                reject(error);
            });
    });
}