
/**
 * Profile related routes
 */

"use strict";

module.exports = function (router) {

    var profileController = require('../controllers/profiles');

    /**
     * Get profile by id
     * @param {String} id: The profile id
     */
    router.route("/:id")
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
     * Modify existing profile
     * @param {String} id: The profile id
     */
    router.route("/:id")
        .put(function(req, res, next) {
            console.log("HEllo from the other side")
            var id = req.params.id;
            profileController.modifyProfile(id, req.body, function(response) {
                console.log("CONTROLLER: ");
                console.log(response);
                res.send(req.body);
            })
        })

    /**
     * Add new profile
     */
    router.route("/")
        .post(function (req, res, next) {
            var profile = req.body;
            profileController.addProfile(profile, function(err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                res.status(201).send(req.body);
            });
        });

    /**
     * Get a profile's history
     * @param {String} id: The profile id
     */
    router.route("/:id/history")
        .get(function (req, res, next) {
            var id = req.params.id;
            profileController.getHistory(id, function(err, history) {
                if (err) {
                    res.sendStatus(404);
                }
                res.send(history);
            });
        });

    /**
     * Add a message to a profile's history
     * @param {String} id: The profile id
     */
    router.route("/:id/history")
        .post(function (req, res, next) {
            var id = req.params.id;
            var message = req.body;
            profileController.addToHistory(id, message, function(err) {
                if (err) {
                    res.sendStatus(404);
                }
                res.sendStatus(201);
            });
        });

    /**
     * Get a profile's history for a specific group
     * @param {String} profileId: The profile id
     * @param {String} groupId: The group id
     */
    router.route("/:profileId/history/:groupId")
        .get(function (req, res, next) {
            var profileId = req.params.profileId;
            var groupId = req.params.groupId;
            profileController.getGroupHistory(profileId, groupId, function(err, history) {
                if (err) {
                    res.sendStatus(404);
                }
                res.send(history);
            });
        });

    /**
     * Get all contacts
     * @param {String} id: The profile id
     */
    router.route("/:id/contact")
        .get(function (req, res, next) {
            var id = req.params.id;
            profileController.getAllContacts(id, function(err, contacts) {
                if (err) {
                    res.sendStatus(404);
                }
                res.send(contacts);
            });
        });
        
    /**
     * Get a specific contact
     * @param {String} profileId: The profile id
     * @param {String} contactId: The contact id
     */
    router.route("/:profileId/contact/:contactId")
        .get(function (req, res, next) {
            var profileId = req.params.profileId;
            var contactId = req.params.contactId;
            profileController.getContactById(profileId, contactId, function(err, contact) {
                if (err) {
                    res.sendStatus(404);
                }
                res.send(contact);
            });
        });        

    /**
     * Add a contact
     * @param {String} id: The profile id
     */
    router.route("/:id/contact")
        .post(function (req, res, next) {
            var id = req.params.id;
            var body = req.body;
            profileController.addContact(id, body.contact_id, function(err) {
                if (err) {
                    res.status(500).send(err);
                }
                res.sendStatus(204);
            });
        });

    /**
     * Delete a contact
     * @param {String} profileId: The profile id
     * @param {String} contactId: The contact id
     */
    router.route("/:profileId/contact/:contactId")
        .delete(function (req, res, next) {
            var profileId = req.params.profileId;
            var contactId = req.params.contactId;
            profileController.removeContact(profileId, contactId, function(err) {
                if (err) {
                    res.status(500).send(err);
                }
                res.sendStatus(204);
            });
        });
};
