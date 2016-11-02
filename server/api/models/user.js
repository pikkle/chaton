"use strict";

var mongodb = require('mongodb');

class User {
    constructor (id, email, login, password, publicKey) {
        this._id = id;
        this._email = email;
        this._login = login;
        this._password = password;
        this._publicKey = publicKey;

        // Defaults
        this._avatar = null;
        this._blacklist = [];
        this._history = [];

    }

    static findByID(id) {
        return new User(id, "tester@test.com", "tester", "IJvunei@q9km21?", "invsuvsuNJMI(3", "01010001001110001")
    }

    get id() {
        return this._id;
    }
}

module.exports = User;
