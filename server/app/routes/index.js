
/**
 * Routes initialization
 */

"use strict";

var config = require("../../config/config");
var express = require("express");
var expressJWT = require("express-jwt");

module.exports = function (app) {
    
    // all routes need token authentication, except
    // - authentication endpoint
    // - profile creation endpoint
    // - todo: check if email available endpoint
    app.use(expressJWT({ secret: config.secret }).unless(function(req) {
        return (
            req.originalUrl === '/api/auth' && req.method === 'POST' ||
            req.originalUrl === '/api/profile' && req.method === 'POST' ||
            req.originalUrl === '/api/group' && req.method === 'GET'
        );
    }));

    // authentication
    var authRouter = express.Router();
    require("./auth.js")(authRouter);
    app.use("/api/auth", authRouter);

    // profiles
    var profileRouter = express.Router();
    require("./profiles.js")(profileRouter);
    app.use("/api/profile", profileRouter);

    // groups
    var groupRouter = express.Router();
    require("./groups.js")(groupRouter);
    app.use("/api/group", groupRouter);
};