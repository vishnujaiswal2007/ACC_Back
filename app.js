
const {
    json
} = require('body-parser');
const { STATUS_CODES } = require('http');
const {
    ObjectId
} = require('mongodb');
const {
    stringify
} = require('querystring');


var express = require('express');
var app = express();
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Server is listening at http://%s:%s", host, port);
});


app.use(express.json({
    limit: '50mb'
}));


app.use(express.urlencoded({
    extended: false,
    limit: '50mb'
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5505');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
