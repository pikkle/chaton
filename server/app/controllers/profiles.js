
/**
 * Profile controller
 */

"use strict";

var mongoose = require("../models/profile"),
    Profile = mongoose.model("Profile");

/**
 * Get profile by id
 * 
 * @param {String} id: The id of the profile
 * @param {Function} callback(err, profile): called once the profile found
 */
exports.findById = function(id, callback) {
    Profile.findById(id, function(err, profile) {
        if (err) {
            callback(err);
        } else {
            callback(null, profile);
        }
    });
};

/**
 * Add new profile
 */
exports.add = function() {
    // todo
};
