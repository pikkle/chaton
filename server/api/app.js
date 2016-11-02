"use strict";

var express = require('express');
var app = express();

require('./routes.js')(app);

app.listen(9000);
