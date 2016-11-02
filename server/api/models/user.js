"use strict";

var mongodb = require('mongodb');

function User(id, email, login, password, publicKey, avatar) {
    this._id = id;
    this._email = email;
    this._login = login;
    this._password = password;
    this._publicKey = publicKey;
    this._avatar = avatar;

}

User.prototype.id = function() {
    return this._id;
};

User.findByID = function(id) {
    return new User(id, "tester@test.com", "tester", "IJvunei@q9km21?", "invsuvsuNJMI(3", "01010001001110001")
};

module.exports = User;
