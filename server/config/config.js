
/**
 * Server configuration file
 */

"use strict";

module.exports = {
    /**
     * Json web token secret
     */
    secret: "da39a3ee5e6b4b0d3255bfef95601890afd80709",

    /**
     * Listening port for websocket requests
     */
    server_listen_port: 80,

    /**
     * Time available for a new client to authenticate
     */
    auth_timeout: 5000,

    /**
     * Database URL
     */
    db_url: "mongodb://192.168.99.100/chaton"
}
