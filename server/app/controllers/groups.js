
"use strict";

var mongooseGroup = require("../models/group"),
    Group = mongooseGroup.model("Group");

exports.addGroup = function (data, callback) {
    var group = new Group(data);
    group.save(function (err, result) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    })
}

exports.findById = function(id, callback) {
    Group.findById(id)
        .populate("members", "_id email username public_key")
        .exec(function(err, profile) {
            if(err) {
                callback(err);
                return;
            }
            callback(null, group);
        })
}