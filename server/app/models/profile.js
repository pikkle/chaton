
/**
 * Schema for a user profile
 */

"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    email: { type: String, trim: true },
    validated: Boolean,
    username: { type: String, trim: true },
    password: { type: String, trim: true },
    public_key: { type: String, trim: true },
    avatar: Buffer,
    contacts: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    blacklist: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    history: [{
        _id: false,
        group: { type: Schema.Types.ObjectId, ref: "Group" },
        messages: [{type: Schema.Types.ObjectId, ref: "Message"}]
    }],
    last_connected: Date
});

module.exports = mongoose.model("Profile", ProfileSchema);
