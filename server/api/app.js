var express = require('express');
var app = express();

app.get('/', function(req, res) {
	console.log("Got a request !");
	res.json({"timestamp" : new Date()}); 
});

app.listen(9000);
