var readerDomain = require('../domain/reader');

//api/reader/:id GET - get by id
exports.getById = function (req, res, next) {
    var id = req.params.id;
    readerDomain.getById(id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                res.status(500).send(err.message);
            }
        });
}

//api/reader/book/:id GET - get all by book
exports.getByBook= function (req, res, next) {
    var id = req.params.id;
    readerDomain.getByBook(id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                res.status(500).send(err.message);
            }
        });
}

//api/reader/book/:id GET - get all by book
exports.get = function (req, res, next) {
    readerDomain.get()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                res.status(500).send(err.message);
            }
        });
}

//api/reader POST - add reader
exports.add = function (req, res, next) {
    var readerData = req.body;
    readerDomain.add(readerData)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                res.status(500).send(err.message);
            }
        });
}

//api/reader PUT - update reader
exports.update = function (req, res, next) {
    var readerData = req.body;
    var id = req.params.id;
    readerDomain.update(id, readerData)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                res.status(500).send(err.message);
            }
        });
}

//api/reader DELETE - delete reader
exports.delete = function (req, res, next) {
    var id = req.params.id;
    readerDomain.delete(id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                res.status(500).send(err.message);
            }
        });
}

//api/reader/rent/:id/:bookId GET - rent book to user
exports.rent = function (req, res, next) {
    var id = req.params.id;
    var bookId = req.params.bookId;
    readerDomain.rent(id, bookId)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                res.status(500).send(err.message);
            }
        });
}

//api/reader/return/:uuid/:bookId GET - rent book to user
exports.return = function (req, res, next) {
    var uuid = req.params.uuid;
    var bookId = req.params.bookId
    console.log(uuid);
    readerDomain.return(uuid, bookId)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.log(err);
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                res.status(500).send(err.message);
            }
        });
}