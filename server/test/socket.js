
/**
 * Web socket tests
 */

var config = require("../config/config");

var chai = require("chai"),
    mocha = require("mocha"),
    should = chai.should();
 
var io = require("socket.io-client");

var socketURL = "http://localhost:" + config.server_listen_port;

var server,
    options = {
        transports: ["websocket"],
        'force new connection': true
    };

describe("Web socket tests", function() {
    
    /**
     * Verify that we can connect to the web socket
     */
    it("Can connect to socket", function(done) {

        var client = io.connect(socketURL, options);
        
        client.on("connect", function(data) {
            client.disconnect();
            done();
        });
    });
        
    /**
     * Verify that we are automatically disconnected if not authenticated
     */
    it("Authentication timout works", function(done) {
    
        var client = io.connect(socketURL, options);
        
        client.on("connect", function(data) {
            
            client.on("disconnect", function(data) {
                done();
            });
        });
    }).timeout(config.auth_timeout + 500);
});
