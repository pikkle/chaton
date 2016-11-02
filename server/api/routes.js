/*
This file contains the routes for the api. It basically redirects GET/POST requests to controllers.
 */
module.exports = function(app){
    var startingTime = Math.floor(Date.now()/1000);
    var pjson = require('./package.json');
    var users = require('./controllers/userController').userController;


    app.get('/', function(req, res) {
    	res.json(
    	    {
                "version" : pjson.version,
                "timestamp" : new Date(),
                "uptime_seconds" : Math.floor(Date.now()/1000) - startingTime
    	    }
    	);
    });

    app.get('/users/:id', function(req, res) {
        var id = req.params.id;
        res.json(users.findByID(id))
    });

};
