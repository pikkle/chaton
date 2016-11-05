
/**
 * Schema for a conversation group
 */

"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: { type: String, trim: true },
    members: [Schema.Types.ObjectId]
});

module.exports = mongoose.model("Group", GroupSchema);
