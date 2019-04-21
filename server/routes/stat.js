var statDomain = require('../domain/stat');

//api/stat GET - get statistics
exports.getStatistics = function (req, res, next) {
    statDomain.getStatistics()
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