
/**
 * Routes initialization
 */

"use strict";

var config = require("../../config/config");
var express = require("express");
var expressJWT = require("express-jwt");

module.exports = function (app) {
    
    // all routes need token authentication, except authentication endpoint
    app.use(expressJWT({ secret: config.secret }).unless({ path: ["/api/auth"] }));

    // authentication
    var authRouter = express.Router();
    require("./auth.js")(authRouter);
    app.use("/api/auth", authRouter);

    // profiles
    var profileRouter = express.Router();
    require("./profiles.js")(profileRouter);
    app.use("/api/profile", profileRouter);
};
