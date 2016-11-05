
/**
 * Application entrypoint
 */

"use strict";

var express = require("express"),
    app = express(),
    mongoose = require("mongoose");

// server configuration
var config = require("./config/config");

// connect to database
console.log("Connecting to database...");
mongoose.connect(config.db_url);

var db = mongoose.connection;
db.on("error", function() {
    console.log("Cannot connect to database")
});
db.once("open", function() {
    console.log("Connected to database")
});

// initialize routes
require("./app/routes/index")(app);

// start listening for client requests
app.listen(config.server_listen_port, function () {
    console.log("Server is listening...");
});