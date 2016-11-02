"use strict";
var users = require('../models/user');
var mongoClient = require('mongodb').MongoClient;

class UserController {
    static findByID(id) {
        return users.findByID(id);
    }
}

module.exports.userController = UserController;
