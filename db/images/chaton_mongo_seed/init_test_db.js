
// Database init script for testing

"use strict";

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://chaton_mongo:27017/test';
var data = require('./test_data');

MongoClient.connect(url, function(err, db) {
	if (err) {
		return console.dir(err);
	}

	var profileIds = [new ObjectID("582a1f297f82ce34244d840e"), new ObjectID("582a1f297f82ce34244d840f")];
	for (var i = 0; i < data.length; i++) {
		data[i]._id = profileIds[i]; // replace ids with generated ObjectIDs
		var tmp = profileIds.slice(); // add all other profiles to contacts other than self
		tmp.splice(i, 1);
		data[i].contacts = tmp;
	}

	// add datas
	db.collection('profiles').insertMany(data);

	db.close();
});
