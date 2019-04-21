var Reader = require('../models/reader');
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
        Reader.getById(id)
            .then(reader => {
                resolve(reader);
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
        Reader.get()
            .then(readers => {
                resolve(readers);
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

exports.getByBook = function (bookId) {
    return new Promise(function (resolve, reject) {
        Reader.getByBook(bookId)
            .then(readers => {
                resolve(readers);
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

exports.add = function (readerData) {
    return new Promise(function (resolve, reject) {
        if (!readerData.firstName ||
            !readerData.lastName ||
            !readerData.email ||
            !readerData.dateOfBirth ||
            !readerData.gender) {
            let error = {
                status: Status.BAD_REQUEST,
                message: 'Name, DOB, Email and Gender fields are required.'
            }
            reject(error);
            return;
        }

        readerData.addedAt = new Date();
        readerData.updatedAt = new Date();

        Reader.add(readerData).then(reader => {
            resolve(reader);
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

exports.update = function (id, readerData) {
    return new Promise(function (resolve, reject) {
        if (!readerData.firstName ||
            !readerData.lastName ||
            !readerData.email ||
            !readerData.dateOfBirth ||
            !readerData.gender) {
            let error = {
                status: Status.BAD_REQUEST,
                message: 'Name, DOB, Email and Gender fields are required.'
            }
            reject(error);
            return;
        }

        readerData._id = id;
        readerData.updatedAt = new Date();
        console.log(readerData);
        Reader.update(readerData).then(reader => {
            resolve(reader);
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
        Reader.delete(id).then(id => {
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

exports.rent = function (id, bookId) {
    return new Promise(function (resolve, reject) {
        if (!id || !bookId) {
            let error = {
                status: Status.BAD_REQUEST,
                message: 'Reader and Book is required.'
            }
            reject(error);
            return;
        }
        Reader.rent(id, bookId).then(data => {
            Book.rent(bookId, 1);
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
}

exports.return = function (uuid, bookId) {
    return new Promise(function (resolve, reject) {
        if (!uuid) {
            let error = {
                status: Status.BAD_REQUEST,
                message: 'Identifier is required.'
            }
            reject(error);
            return;
        }
        Reader.return(uuid).then(data => {
            Book.rent(bookId, -1);
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
}