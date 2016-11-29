
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
            console.log("Hello");
            // disable timeout
            clearTimeout(auth_timeout);

            // verify token
            jwt.verify(data.token, config.secret, function (err, decoded) {
                if (err) {
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
        socket.on("send_message", function (data) {
            authenticate(data);
            console.log("Received message: ");
            console.log(data);
            // todo
            socket.emit("message_processed");

            profileController.addMessageToConversation(data, function (err, response) {
                if (err) {
                    
                } else {
                    console.log("Maybe saved");
                }
            });

            var receiverSocket = connected_clients[data.receiver];
            receiverSocket.emit("new_message", { content: data.content, sender: data.sender });
        });
        // authentication event
        socket.on("authenticate", authenticate);
    });
};