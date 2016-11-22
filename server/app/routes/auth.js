/**
 * Authentication related routes
 */

"use strict";

module.exports = function (router) {

    var authController = require('../controllers/auth');

    /**
     * Authenticate credentias
     */
    router.route("/")
        .post(function (req, res, next) {
            var email = req.body.email;
            var password = req.body.password;
            authController.verify(email, password, function (err, token, _id) {
                if (err) {
                    res.status(401).send(err);
                }
                res.status(200).send({ "token": token , "id": _id});
            });
        });
};
