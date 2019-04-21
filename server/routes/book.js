var bookDomain = require('../domain/book');

//api/book GET - get by id
exports.getById = function (req, res, next) {
    var id = req.params.id;
    bookDomain.getById(id)
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

//api/book GET - get all
exports.get = function (req, res, next) {
    bookDomain.get()
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

//api/book POST - add book
exports.add = function (req, res, next) {
    var bookData = req.body;
    bookDomain.add(bookData)
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

//api/book PUT - update book
exports.update = function (req, res, next) {
    var bookData = req.body;
    var id = req.params.id;
    bookDomain.update(id, bookData)
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

//api/book DELETE - delete book
exports.delete = function (req, res, next) {
    var id = req.params.id;
    bookDomain.delete(id)
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