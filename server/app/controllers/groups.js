
"use strict";
var mongooseProfile = require('../models/profile'),
    Profile = mongooseProfile.model("Profile");
var mongooseGroup = require("../models/group"),
    Group = mongooseGroup.model("Group");
var socket = require('../socket');

exports.addGroup = function (data, callback) {
    data.isCreatedGroup = true;
    var group = new Group(data);
    var history = {
        group: group._id,
        members: group.members,
        messages: []
    };
    group.members.forEach(member => {
        Profile.findOne({ '_id': member }, function (err, profile) {
            if (err) {
                callback(err);
            } else {
                profile.history.push(history);
                profile.save();
            }
        })
    })

    group.save(function (err, result) {
        if (err) {
            callback(err);
            return;
        }
        return result;
    }).then(result => {
        group.members.forEach(member => {
            socket.notifyNewGroup(member, group);
        })
        callback(result);
    })
};

exports.findById = function (id, callback) {
    Group.findById(id)
        .populate("members", "_id email username public_key")
        .exec(function (err, profile) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, group);
        })
};