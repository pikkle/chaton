
/**
 * Web socket handler
 */

"use strict";

var config = require("../config/config");
var jwt = require("jsonwebtoken");

module.exports = function (socketio) {

    // connection event
    socketio.on("connection", function (socket) {

        // client has limited time to authenticate
        var auth_timeout = setTimeout(function () {
            socket.disconnect("Authentication timeout reached");
        }, config.auth_timeout);

        // handle authentication
        var authenticate = function (data) {

            // disable timeout
            clearTimeout(auth_timeout);

            // verify token
            jwt.verify(data.token, config.secret, function (err, decoded) {
                if (err) {
                    socket.disconnect("Invalid token");
                }
                if (!err && decoded) {

                    // todo: manage socket list

                    socket.connectedAt = new Date();
                    socket.emit("authenticated");

                    // disconnection event
                    socket.on("disconnect", function () {
                        // todo: revoke token? to discuss
                    });

                    // message sent event
                    socket.on("send_message", function () {
                        // todo
                        socket.emit("message_processed");
                    });
                }
            })
        }

        // authentication event
        socket.on("authenticate", authenticate);
    });
};