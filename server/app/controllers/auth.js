/**
 * Authentication controller
 */

"use strict";

var config = require("../../config/config");
var mongoose = require("../models/profile"),
    Profile = mongoose.model("Profile");
var jwt = require("jsonwebtoken");

/**
 * verifies credentials
 * @param {String} email: The profile's email
 * @param {String} password: The hashed password
 * @param {Function} callback(err, token): called once finished
 */
exports.verify = function(email, password, callback) {
    Profile.findOne({ "email": email, "password": password }, function(err, profile) {
        if (err || !profile) {
            callback("Invalid credentials");
        } else {
            // generate and return Json web token
            var token = jwt.sign({}, config.secret);
            callback(null, token, profile._id);
        }
    });
};