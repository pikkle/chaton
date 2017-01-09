/**
 * Profile controller
 */

"use strict";

var mongooseProfile = require("../models/profile"),
    Profile = mongooseProfile.model("Profile");
var mongooseGroup = require("../models/group"),
    Group = mongooseGroup.model("Group");
var mongooseMessage = require("../models/message"),
    Message = mongooseMessage.model("Message");
var socket = require('../socket');
/**
 * Get profile by id * 
 * @param {String} id: The profile id
 * @param {Function} callback(err, profile): called once finished
 */
exports.findById = function (id, callback) {
    Profile.findById(id)
        .populate("contacts", "_id email username public_key avatar")
        .populate({
            path: 'history.group',
            populate:  {path: "members", select: "email username public_key"}  
        })
        .populate("history.messages")
        .exec(function (err, profile) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, profile);
        });
};

/**
 * Add new profile
 * @param {Profile} profile: The profile
 * @param {Function} callback(err, result): called once finished
 */
exports.addProfile = function (data, callback) {
    var profile = new Profile(data);
    profile.save(function (err, result) {
        if (err) {
            callback(err);
            return;
        }

        callback(null, result);
    });
};

/**
 * Get all contacts
 * @param {String} id: The profile id
 * @param {Function} callback(err, contacts): called once finished
 */
exports.getAllContacts = function (id, callback) {
    Profile.findById(id)
        .populate("contacts", "_id email username public_key avatar")
        .exec(function (err, profile) {

            if (err) {
                callback(err);
                return;
            }

            if (profile) {
                callback(null, profile.contacts);
            }
        });
};

exports.modifyProfile = function (id, body, callback) {
    Profile.findById(id, function (err, profile) {
        if (err) {
            callback(err);
        }
        if (body.username) {
            profile.username = body.username;
        }
        if (body.password) {
            profile.password = body.password;
        }
        profile.save();
        callback({ "response": "OK" });
    })
};

/**
 * Get a specific contact
 * @param {String} profileId: The profile id
 * @param {String} contactId: The contact id
 * @param {Function} callback(err, contact): called once finished
 */
exports.getContactById = function (profileId, contactId, callback) {
    Profile.findById(profileId)
        .populate("contacts", "_id email username public_key avatar")
        .exec(function (err, profile) {
            if (err) {
                callback(err);
                return;
            }

            if (profile) {
                for (var i = 0; i < profile.contacts.length; i++) {
                    if (profile.contacts[i]._id == contactId) {
                        callback(null, profile.contacts[i]);
                        break;
                    }
                }
            }
        });
};

/**
 * Add a contact
 * @param {String} profileId: The profile id
 * @param {String} contactEmail: The contact email
 * @param {Function} callback(err): called once finished
 */
exports.addContact = function (profileId, contactEmail, callback) {
    Profile.findById(profileId, function (err, profile) {
        if (err) {
            callback(err);
            return;
        }
        if (profile) {
            Profile.findOne({ 'email': contactEmail }, function (err2, newContact) {
                if (err2) {
                    callback(err2);
                    return;
                }
                if (profileId == newContact.id) {
                    // TODO: proper error (crashes the server currently: Can't set headers after they are sent.)
                    return;
                }
                if (newContact) {
                    if (profile.contacts.indexOf(newContact.id) === -1) {
                        profile.contacts.push(newContact.id);
                        newContact.contacts.push(profile.id);

                        var group = new Group({
                            isCreatedGroup: false,
                            name: newContact.username,
                            members: [profileId, newContact.id]
                        });

                        var history = {
                            group: group._id,
                            members: group.members,
                            messages: []
                        };
                        profile.history.push(history);
                        newContact.history.push(history);

                        newContact.save();
                        profile.save();
                        group.save();
                        socket.notifyNewContact(newContact.id, profileId, group);
                    }
                }
            });
        }
        callback();
    });
};

/**
 * Get a profile's history
 * @param {String} id: The profile id
 * @param {Function} callback(err, history): called once finished
 */
exports.getHistory = function (id, callback) {
    Profile.findById(id)
        .exec(function (err, profile) {
            if (err) {
                callback(err);
                return;
            }

            if (profile) {
                callback(null, profile.history);
            }
        });
};

/**
 * Get a profile's history for a specific group
 * @param {String} profileId: The profile id
 * @param {String} groupId: The group id
 * @param {Function} callback(err, history): called once finished
 */
exports.getGroupHistory = function (profileId, groupId, callback) {
    Profile.findById(profileId)
        .exec(function (err, profile) {
            if (err) {
                callback(err);
                return;
            }

            if (profile) {
                var history = profile.history.find(function (h) {
                    return h.group && h.group._id == groupId;
                });

                if (history) { // no history for this conversation
                    callback(null, history);
                } else { // existing history
                    callback(null, {});
                }
            } else {
                callback("Profile not found");
            }
        });
};

/**
 * Add a message to user's history
 * @param {String} profileId: The profile id
 * @param {Message} message: The message to add
 * @param {Function} callback(err): called once finished
 */
exports.addToHistory = function (profileId, message, callback) {
    // validate new message
    delete message.token;
    message.state = 1;
    var m = new Message(message);
    m.save();

    Profile.findById(profileId, function (err, profile) {
        if (err) {
            callback(err);
            return;
        }

        if (profile) {

            var history = profile.history.find(function (h) {
                return h.group == message.group;
            });
            // existing history
            if (history) {
                history.messages.push(m);
                // no history for this conversation
            } else {
                // create new group
                var group = new Group({
                    name: message.group,
                    members: [message.sender, message.receiver]
                });

                // associate group and message
                m.group = group;

                // update history
                profile.history.push({ group: group, messages: [m] });
                group.save();
            }

            profile.save();
            callback();
        } else {
            callback("Profile not found");
        }
    });
}

/**
 * Delete a contact
 * @param {String} profileId: The profile id
 * @param {String} contactId: The contact id
 * @param {Function} callback(err): called once finished
 */
exports.removeContact = function (profileId, contactId, callback) {
    Profile.findById(profileId, function (err, profile) {
        if (err) {
            callback(err);
            return;
        }

        if (profile) {
            var index = profile.contacts.indexOf(contactId);
            if (index != -1) {
                profile.contacts.splice(index, 1);
                profile.save();
            }
        }
        callback();
    });
};