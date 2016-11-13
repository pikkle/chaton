
// Database init script for testing

"use strict";

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://192.168.99.100:27017/chaton';

MongoClient.connect(url, function(err, db) {

	var profileId1 = new ObjectID();
	var profileId2 = new ObjectID();

	// clear profiles
	db.collection('profiles').remove();
	
	// add profile
	db.collection('profiles').insertMany(
		[
			{
				"_id": profileId1,
				"email": "john.doe@gmail.com",
				"username": "john",
				"password": "sooo secret",
				"public_key": "1234567890",
				"avatar": "0x1234",
				"contacts": [profileId2],
				"blacklist": [],
				"history": []
			},
			{
				"_id": profileId2,
				"email": "mary.jane@gmail.com",
				"username": "mary",
				"password": "sooo secret",
				"public_key": "9876543210",
				"avatar": "0x56789",
				"contacts": [profileId1],
				"blacklist": [],
				"history": []
			}
		]
	);

	db.close();
});