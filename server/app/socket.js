
/**
 * Web socket handler
 */

"use strict";

var config = require("../config/config");
var authController = require('./controllers/auth');
var jwt = require("jsonwebtoken");
var profileController = require('./controllers/profiles')
var connected_clients = {};

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
                    socket.emit("error_authentication");
                    socket.disconnect("Invalid token");
                }
                if (!err && decoded) {

                    // update socket list
                    console.log("Authenticated: " + data.id);
                    socket.profileId = data.id;
                    connected_clients[data.id] = socket;

                    socket.connectedAt = new Date();
                    socket.emit("authenticated");
                }
            })
        }
        // disconnection event
        socket.on("disconnect", function () {
            console.log("Disconnected: " + socket.profileId);

            // todo: remove socket & revoke token? to discuss
            delete connected_clients[socket.profileId];
        });

        // message sent event
        socket.on("send_message", function (message) {
            authenticate(message);
            
            // todo : one tick & two ticks
            socket.emit("message_processed");

            // add message to destination user's history
            profileController.addToHistory(message.receiver, message, function (err, response) {
                if (err) {
                    console.log(err);
                }
            });

            // send message to destination user (if connected)
            var receiverSocket = connected_clients[message.receiver];
            if (receiverSocket) {
                receiverSocket.emit("new_message", message);
            }
        });

        // authentication event
        socket.on("authenticate", authenticate);
    });
};