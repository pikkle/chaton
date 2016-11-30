
/**
 * Profile controller
 */

"use strict";

var mongoose = require("../models/profile"),
    Profile = mongoose.model("Profile");

/**
 * Get profile by id * 
 * @param {String} id: The profile id
 * @param {Function} callback(err, profile): called once finished
 */
exports.findById = function (id, callback) {
    Profile.findById(id)
        .populate("contacts", "_id email username public_key avatar")
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
 * @param {Object} profile: The profile
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
 * Get a profile's history
 * @param {String} id: The profile id
 * @param {Function} callback(err, history): called once finished
 */
exports.getHistory = function (id, callback) {
    Profile.findById(id, function (err, profile) {
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
 * @param {String} contactId: The contact id
 * @param {Function} callback(err): called once finished
 */
exports.addContact = function (profileId, contactId, callback) {
    Profile.findById(profileId, function (err, profile) {
        if (err) {
            callback(err);
            return;
        }

        if (profile) {
            if (profile.contacts.indexOf(contactId) === -1) {
                profile.contacts.push(contactId);
                profile.save();
            }
        }
        callback();
    });
};

/**
 * Add a message to user's history
 * @param {String} profileId: The profile id
 * @param {String} contactId: The contact id
 */
exports.addMessageToConversation = function (data, callback) {
    /*Profile.findById(data.id, function (err, profile) {
        if (err) {
            callback(err);
            return;
        }

        if (profile) {
            profile.history.filter(historyObj => {
                return historyObj.group == data.receiver;
            }, result => {
                if (result == null) {
                    historyObj.push({
                        group: data.receiver,
                        messages: [{
                            id: data.id,
                            timestamp: new Date(),
                            state: 1,
                            type: "txt",
                            extension: ".txt",
                            sender: data.sender,
                            content: data.content
                        }]
                    })
                } else {
                    result.messages.push({
                        id: data.id,
                        timestamp: new Date(),
                        state: 1,
                        type: "txt",
                        extension: ".txt",
                        sender: data.sender,
                        content: data.content
                    })
                }
                profile.save();
            })
        }
    })
    callback();*/
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