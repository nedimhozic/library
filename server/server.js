var express = require('express');
var bodyparser = require('body-parser');
var dotenv = require('dotenv').config();
var dbClient = require('./helpers/db_client');

var app = express();
var port = process.env.PORT || 3000;

function run() {
    var routes = require('./routes/index');
    app.use(bodyparser.urlencoded({ extended: false }));
    app.use(bodyparser.json({ limit: '10mb' }));
    routes.assignRoutes(app);
    app.listen(port);
    console.log('Server started on port ' + port);
}

dbClient.DBConnect()
    .then(() => {
        run();
    })
    .catch(err => {
        console.log('Error: ' + err)
    });