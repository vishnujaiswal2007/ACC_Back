var express = require('express');
var app = express();
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Server is listening at http://%s:%s", host, port);
});

