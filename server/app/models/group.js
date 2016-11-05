
/**
 * Schema for a conversation group
 */

"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: "Profile" }]
});

module.exports = mongoose.model("Group", GroupSchema);
