/**
 * Group related routes
 */

"use strict";

module.exports = function (router) {
    var groupController = require('../controllers/groups');

    /**
     * Get group by id
     * @param {String} id: The group id
     */
    router.route("/:id")
        .get(function (req, res, next) {
            console.log("hellou")
            var id = req.params.id;
            groupController.findById(id, function (err, group) {
                if (err) {
                    res.sendStatus(404);
                } else if (group) {
                    res.send(group);
                }
            })
        });
    /**
     * Add new Group
     */
    router.route("/")
        .post(function (req, res, next) {
            var group = req.body;
            groupController.addGroup(group, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.status(201).send(result);
                }
            })
        })
}