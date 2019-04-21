var auth = require('./auth');
var user = require('./user');
var book = require('./book');
var reader = require('./reader');
var stat = require('./stat');

//Register routes
exports.assignRoutes = function (app) {
    app.all('/*', auth.checkCorsHeaders);

    //User related routes
    app.post('/api/user/register', user.register);
    app.post('/api/user/login', user.login);
    app.post('/api/user/forgot-password', user.forgotPassword)
    app.post('/api/user/reset-password', user.resetPassword)
    app.get('/api/user/signin', user.signin);
    app.get('/api/user/logout', user.logout);

    app.all('/*', auth.checkAuthHeaders);
        
    //Book related routes
    app.get('/api/book/:id', book.getById);
    app.get('/api/book', book.get);
    app.post('/api/book', book.add);
    app.put('/api/book/:id', book.update);
    app.delete('/api/book/:id', book.delete);

    //Reader related routes
    app.get('/api/reader/:id', reader.getById);
    app.get('/api/reader', reader.get);
    app.get('/api/reader/book/:id', reader.getByBook);
    app.get('/api/reader/rent/:id/:bookId', reader.rent);
    app.get('/api/reader/return/:uuid/:bookId', reader.return);
    app.post('/api/reader', reader.add);
    app.put('/api/reader/:id', reader.update);
    app.delete('/api/reader/:id', reader.delete);

    //Statistics
    app.get('/api/stat', stat.getStatistics);
}