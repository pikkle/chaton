
// Database init script for testing

"use strict";

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://chaton_mongo:27017';
var data = require('./test_data');

MongoClient.connect(url, function(err, db) {
	if (err) {
		return console.dir(err);
	}
	var profileIds = [new ObjectID(), new ObjectID()];
	for (var i = 0; i < data.length; i++) {
		data[i]._id = profileIds[i];
		var tmp = profileIds.slice();
		tmp.splice(i, 1);
		data[i].contacts = tmp;
	}

	// add datas
	db.collection('profiles').insertMany(data);

	db.close();
});
