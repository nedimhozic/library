var auth = require('../domain/auth');

exports.checkCorsHeaders = function (req, res, next) {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization,X-Requested-With,Access-Token,Refresh-Token,Registration-Token');
    res.setHeader('Access-Control-Expose-Headers', 'Access-Token,Refresh-Token,Registration-Token');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
}

//Check authentication headers
exports.checkAuthHeaders = function (req, res, next) {
    let accessToken = req.headers['Access-Token'] || req.headers['access-token'];
    let refreshToken = req.headers['Refresh-Token'] || req.headers['refresh-token'];
    if (!accessToken || !refreshToken) {
        //Send 'Unauthorized - 401' status and return message for missing token
        res.status('401').send('Missing token - auth');
    } else {
        auth.checkToken(accessToken, refreshToken)
            .then(data => {
                res.setHeader('access-token', data.accessToken);
                res.setHeader('refresh-token', data.refreshToken);
                next();
            }).catch(err => {
            if (err.status) {
                res.status(err.status).send(err.message);
            } else {
                console.log(err);
                res.status(500).send(err.message);
            }
            })
    }
}