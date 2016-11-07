
/**
 * Schema for a user profile
 */

"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    email: { type: String, trim: true },
    validated: Boolean,
    login: { type: String, trim: true },
    password: { type: String, trim: true },
    public_key: { type: String, trim: true },
    avatar: Buffer,
    contacts: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    blacklist: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    history: [{
        group: { type: Schema.Types.ObjectId, ref: "Group" },
        messages: [{
            id: { type: String, trim: true },
            timetamp: Date,
            state: Number,
            type: { type: String, trim: true },
            extension: { type: String, trim: true },
            sender: { type: Schema.Types.ObjectId, ref: "Profile" },
            content: String
        }]
    }]
});

module.exports = mongoose.model("Profile", ProfileSchema);
