
// Database init script for testing

"use strict";

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://192.168.99.100:27017/chaton';

MongoClient.connect(url, function(err, db) {

	// clear profiles
	db.collection('profiles').remove();
	
	// add profile
	db.collection('profiles').insertOne(
		{
			"email": "john.doe@gmail.com",
			"login": "john",
			"password": "sooo secret",
			"public_key": "1234567890",
			"avatar": "0x1234",
			"contact": [],
			"blacklist": [],
			"history": []
		}
	);

	db.close();
});