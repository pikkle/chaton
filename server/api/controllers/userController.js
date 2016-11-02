"use strict";
var user = require('../models/user');

module.exports = {
    findByID: function(id) {
        return user.findByID(id);
    }
};


