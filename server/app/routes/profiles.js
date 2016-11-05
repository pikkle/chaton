
/**
 * Profile related routes
 */

"use strict";

module.exports = function (router) {

    var profileController = require('../controllers/profiles');

    /**
     * Get profile by id
     * 
     * @param {String} id: The profile id
     */
    router.route('/:id')
        .get(function (req, res, next) {
            var id = req.params.id;
            profileController.findById(id, function(err, profile) {
                if (err) {
                    res.sendStatus(404);
                }
                res.send(profile);
            });
        });

    /**
     * Add new profile
     */
    router.route('/')
        .post(function (req, res, next) {
            // todo: parse body and call controller
        });
};
