
/**
 * Application entrypoint
 */

"use strict";
var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose");

// server configuration
var config = require("./config/config");

// connect to database
mongoose.Promise = global.Promise;
console.log("Connecting to database...");
mongoose.connect(config.db_url);

var db = mongoose.connection;
db.on("error", function() {
    console.log("Cannot connect to database")
});
db.once("open", function() {
    console.log("Connected to database")
});

var cors = require('cors');

// use it before all route definitions
app.use(cors({ origin: '*' }));
// initialize routes
app.use(bodyParser.json());
require("./app/routes/index")(app);

// open web socket
var http = require('http').Server(app);
var io = require('socket.io')(http);
require("./app/socket")(io);


// start listening for client requests
http.listen(config.server_listen_port, function () {
    console.log("Server is listening...");
});