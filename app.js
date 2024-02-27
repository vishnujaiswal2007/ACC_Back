
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
const { url } = require('inspector');
var app = express();
var server = app.listen(8081, function(){
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


app.post('/formsubmit', function(req,res,next){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://vishnu:acc%402022@localhost:27017/";
    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db("ACC");
        dbo.collection("users").count({}, function(error, numofDocs){
            if(error) return callback(error);
            else{
                var myobj = req.body;
                dbo.collection("users").insertOne(myobj, function(err, res){
                    if(err) throw err;
                    db.close
                });
                res.send("1");
            }
        })
    })
});