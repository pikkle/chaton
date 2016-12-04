
/**
 * Schema for a message
 */

"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
    id: { type: String, trim: true },
    timetamp: Date,
    state: Number,
    type: { type: String, trim: true },
    extension: { type: String, trim: true },
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    sender: { type: Schema.Types.ObjectId, ref: "Profile" },
    receiver: { type: Schema.Types.ObjectId, ref: "Profile" },
    content: String
});

module.exports = mongoose.model("Message", MessageSchema);
