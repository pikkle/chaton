
/**
 * Routes initialization
 */

"use strict";

var express = require('express');

module.exports = function (app) {
    
    // profiles
    var profileRouter = express.Router();
    require("./profiles.js")(profileRouter);
    app.use("/api/profile", profileRouter);
};
