
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
    contacts: [Schema.Types.ObjectId],
    blacklist: [Schema.Types.ObjectId],
    history: [{
        group: Schema.Types.ObjectId,
        messages: [{
            id: { type: String, trim: true },
            timetamp: Date,
            state: Number,
            type: { type: String, trim: true },
            extension: { type: String, trim: true },
            sender: Schema.Types.ObjectId,
            content: String
        }]
    }]
});

module.exports = mongoose.model('Profile', ProfileSchema);
