
/**
 * Profile tests
 */

var config = require("../config/config");

var chai = require("chai"),
    chaiHttp = require("chai-http"),
    mocha = require("mocha"),
    should = chai.should();

var serverUrl = "http://localhost:3030";

var testProfile = {
    email: "john.doe@gmail.com",
    username: "john",
    password: "1234",
    public_key: "abcdef"
}
var testContactId = "582a1f297f82ce34244d840e";

describe("Profile tests", function () {

    /**
     * Verify that we can create a new profile
     */
    it("Can create new profile", function (done) {

        chai.request(serverUrl)
            .post("/api/profile")
            .send(testProfile)
            .end((err, res) => {
                res.should.have.status(201);
                testProfile._id = res.body._id;
                done();
            });
    });

    /**
     * Verify that we can get authenticate to the API
     */
    it("Can authenticate", function (done) {

        // get token
        chai.request(serverUrl)
            .post("/api/auth")
            .send({ email: testProfile.email, password: testProfile.password })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    /**
     * Verify that we can get an existing profile
     */
    it("Can get a profile", function (done) {

        // get token
        chai.request(serverUrl)
            .post("/api/auth")
            .send({ email: testProfile.email, password: testProfile.password })
            .end((err, res) => {
                res.should.have.status(200);
                var token = res.body.token;

                chai.request(serverUrl)
                    .get("/api/profile/" + testProfile._id)
                    .set("Authorization", "Bearer " + token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        if (res.body._id == testProfile._id && res.body.public_key == testProfile.public_key) {
                            done();
                        }
                    });
            });
    });
    
    /**
     * Verify that we can add a contact
     */
    it("Can add a contact", function (done) {

        // get token
        chai.request(serverUrl)
            .post("/api/auth")
            .send({ email: testProfile.email, password: testProfile.password })
            .end((err, res) => {
                res.should.have.status(200);
                var token = res.body.token;

                chai.request(serverUrl)
                    .post("/api/profile/" + testProfile._id + "/contact")
                    .send({ contact_id: testContactId })
                    .set("Authorization", "Bearer " + token)
                    .end((err, res) => {
                        res.should.have.status(204);
                        done();
                    });
            });
    });
    
    /**
     * Verify that we can get all contacts
     */
    it("Can get all contacts", function (done) {

        // get token
        chai.request(serverUrl)
            .post("/api/auth")
            .send({ email: testProfile.email, password: testProfile.password })
            .end((err, res) => {
                res.should.have.status(200);
                var token = res.body.token;

                chai.request(serverUrl)
                    .get("/api/profile/" + testProfile._id + "/contact")
                    .set("Authorization", "Bearer " + token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        var contacts = res.body;
                        if (contacts.length == 1 && contacts[0]._id == testContactId) {
                            done();
                        }
                    });
            });
    });
    
    /**
     * Verify that we can get a specific contact
     */
    it("Can get specific contact", function (done) {

        // get token
        chai.request(serverUrl)
            .post("/api/auth")
            .send({ email: testProfile.email, password: testProfile.password })
            .end((err, res) => {
                res.should.have.status(200);
                var token = res.body.token;

                chai.request(serverUrl)
                    .get("/api/profile/" + testProfile._id + "/contact/" + testContactId)
                    .set("Authorization", "Bearer " + token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        var contact = res.body;
                        if (contact._id == testContactId) {
                            done();
                        }
                    });
            });
    });
    
    /**
     * Verify that we can remove a contact
     */
    it("Can remove a contact", function (done) {

        // get token
        chai.request(serverUrl)
            .post("/api/auth")
            .send({ email: testProfile.email, password: testProfile.password })
            .end((err, res) => {
                res.should.have.status(200);
                var token = res.body.token;

                chai.request(serverUrl)
                    .delete("/api/profile/" + testProfile._id + "/contact/" + testContactId)
                    .set("Authorization", "Bearer " + token)
                    .end((err, res) => {
                        res.should.have.status(204);
                        done();
                    });
            });
    });
});