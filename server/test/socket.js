
/**
 * Web socket tests
 */

var config = require("../config/config");

var chai = require("chai"),
    chaiHttp = require("chai-http"),
    mocha = require("mocha"),
    should = chai.should();
var assert = require("chai").assert;
chai.use(chaiHttp);

var io = require("socket.io-client");

var socketURL = "http://localhost:" + config.server_listen_port;

var server,
    options = {
        transports: ["websocket"],
        'force new connection': true
    };

describe("Web socket tests", function () {

    /**
     * Verify that we can connect to the web socket
     */
    it("Can connect to socket", function (done) {

        var client = io.connect(socketURL, options);
        client.on("connect", function (data) {
            client.disconnect();
            done();
        });
    });

    /**
     * Verify that we are automatically disconnected if not authenticated
     */
    it("Authentication timeout works", function (done) {

        var client = io.connect(socketURL, options);
        client.on("connect", function (data) {

            client.on("disconnect", function (data) {
                done();
            });
        });
    }).timeout(config.auth_timeout + 500);

    /**
     * Verify that we can authenticate to the web socket
     */
    it("Can authenticate to socket", function (done) {

        // get token
        chai.request("http://localhost")
            .post("/api/auth")
            .send({ email: "john.doe@gmail.com", password: "sooo secret" })
            .end((err, res) => {
                res.should.have.status(200);
                var token = res.text;

                // connect to websocket
                var client = io.connect(socketURL, options);
                client.on("connect", function (data) {

                    // authenticate
                    client.emit("authenticate", { id: "582a1f297f82ce34244d840e", token: token });

                    // wait on authenticated event
                    client.on("authenticated", function () {
                        client.disconnect();
                        done();
                    });
                });
            });
    });

    /**
     * Verify that we can authenticate to the web socket
     */
    it("Can send a message and get a processed event", function (done) {

        // get token
        chai.request("http://localhost")
            .post("/api/auth")
            .send({ email: "john.doe@gmail.com", password: "sooo secret" })
            .end((err, res) => {
                res.should.have.status(200);
                var token = res.text;

                // connect to websocket
                var client = io.connect(socketURL, options);
                client.on("connect", function (data) {

                    // authenticate
                    client.emit("authenticate", { id: "582a1f297f82ce34244d840e", token: token });

                    // wait on authenticated event
                    client.on("authenticated", function () {

                        // send message
                        client.emit("send_message", { receiver: "582a1f297f82ce34244d840e", content: "hello :)" });

                        // wait on processed message
                        client.on("message_processed", function () {
                            client.disconnect();
                            done();
                        });
                    });
                });
            });
    });


    /**
     * Verify that we can authenticate to the web socket
     */
    it("Can receive a message", function (done) {

        // get token for first client
        chai.request("http://localhost")
            .post("/api/auth")
            .send({ email: "john.doe@gmail.com", password: "sooo secret" })
            .end((err, res) => {
                res.should.have.status(200);
                var token1 = res.text;

                // connect to websocket
                var client1 = io.connect(socketURL, options);
                client1.on("connect", function (data) {

                    // authenticate
                    client1.emit("authenticate", { id: "582a1f297f82ce34244d840e", token: token1 });

                    // wait on authenticated event
                    client1.on("authenticated", function () {

                        // get token for second client
                        chai.request("http://localhost")
                            .post("/api/auth")
                            .send({ email: "mary.jane@gmail.com", password: "sooo secret" })
                            .end((err, res) => {
                                res.should.have.status(200);
                                var token2 = res.text;

                                // connect to websocket
                                var client2 = io.connect(socketURL, options);
                                client2.on("connect", function (data) {

                                    // authenticate
                                    client2.emit("authenticate", { id: "582a1f297f82ce34244d840f", token: token2 });

                                    // wait on authenticated event
                                    client2.on("authenticated", function () {

                                        // client 2 waits on message
                                        client2.on("new_message", function(data) {
                                            assert(data.content, "hello :)");
                                            client1.disconnect();
                                            client2.disconnect();
                                            done();
                                        })

                                        // client 1 sends message
                                        client1.emit("send_message", { receiver: "582a1f297f82ce34244d840f", content: "hello :)" });
                                    });
                                });
                            });
                    });
                });
            });
    });
});
