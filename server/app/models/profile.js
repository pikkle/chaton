/**
 * Schema for a user profile
 */

"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    email: {type: String, trim: true},
    validated: Boolean,
    username: {type: String, trim: true},
    password: {type: String, trim: true},
    private_key: {type: Object}, // private key will be encoded with user's password (updated when user changes his password)
    public_key: {type: Object},
    contacts: [{type: Schema.Types.ObjectId, ref: "Profile"}],
    blacklist: [{type: Schema.Types.ObjectId, ref: "Profile"}],
    history: [{
        _id: false,
        group: {type: Schema.Types.ObjectId, ref: "Group"},
        messages: [{type: Schema.Types.ObjectId, ref: "Message"}]
    }],
    last_connected: Date
});

module.exports = mongoose.model("Profile", ProfileSchema);