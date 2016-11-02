/*
This file contains the routes for the api. It basically redirects GET/POST requests to controllers.
 */
module.exports = function(app){
    var startingTime = new Date().getSeconds();
    var users = require('./controllers/userController');
    var pjson = require('./package.json');

    app.get('/', function(req, res) {
    	res.json(
    	    {
                "version" : pjson.version,
                "timestamp" : new Date(),
                "uptime_seconds" : new Date().getSeconds() - startingTime
    	    }
    	);
    });

    app.get('/users/:id', function(req, res) {
        var id = req.params.id;
        res.json(users.findByID(id))
    });

};
